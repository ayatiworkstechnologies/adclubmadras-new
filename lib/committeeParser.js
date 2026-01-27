
/**
 * Parses the raw HTML from the Executive Committee API into a structured object.
 * Returns an object with: { president, vicePresident, secretary, jtSecretary, treasurer, immediatePastPresident, members, exOfficio, coopted, advisors }
 * Each field is either a string (if single) or an array of strings.
 */
export function parseCommitteeHtml(htmlString) {
    if (typeof window === 'undefined') return {}; // Server-side safety

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const result = {
        president: "",
        vicePresident: "",
        secretary: "",
        jtSecretary: "",
        treasurer: "",
        immediatePastPresident: "",
        members: [],
        exOfficio: [],
        coopted: [],
        advisors: []
    };

    // Helper to clean text
    const clean = (text) => text?.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim() || "";

    // Helper to extract names from a table based on column mapping or direct association
    const tables = Array.from(doc.querySelectorAll('table'));

    tables.forEach(table => {
        // Check if this table belongs to a specific section based on previous heading
        let precedingHeading = cssPreviousHeading(table);
        let section = identifySection(precedingHeading);

        const rows = Array.from(table.querySelectorAll('tr'));
        if (rows.length === 0) return;

        // Detect headers
        // We assume the first row likely contains headers
        let headerRowIndex = 0;
        let headerCells = Array.from(rows[0].querySelectorAll('th, td'));
        // If first row is empty or short, maybe second?
        if (headerCells.every(c => !clean(c.innerText)) && rows.length > 1) {
            headerRowIndex = 1;
            headerCells = Array.from(rows[1].querySelectorAll('th, td'));
        }

        const headers = headerCells.map(c => clean(c.innerText).toLowerCase());

        // Check for "Designation | Member | Organisation" pattern
        const designationIdx = headers.findIndex(h => h.includes('designation') || h.includes('role'));
        const memberIdx = headers.findIndex(h => h.includes('member') || h.includes('name'));
        const orgIdx = headers.findIndex(h => h.includes('organisation') || h.includes('organization') || h.includes('company'));

        // Check for Role-based columns (e.g. "President", "Secretary")
        // If we map columns to specific roles
        const roleMap = {}; // index -> roleKey
        headers.forEach((h, i) => {
            if (h.includes('vice president')) roleMap[i] = 'vicePresident';
            else if (h === 'president') roleMap[i] = 'president';
            else if (h.includes('joint secretary') || h.includes('jt. secretary')) roleMap[i] = 'jtSecretary';
            else if (h === 'secretary') roleMap[i] = 'secretary';
            else if (h.includes('treasurer')) roleMap[i] = 'treasurer';
            else if (h.includes('immediate past president')) roleMap[i] = 'immediatePastPresident';
        });

        // Process data rows
        for (let k = headerRowIndex + 1; k < rows.length; k++) {
            const currentRow = rows[k];
            const cells = Array.from(currentRow.querySelectorAll('td'));
            if (cells.length === 0) continue;

            // Pattern 1: Designation Column exists
            if (designationIdx !== -1 && memberIdx !== -1) {
                const designation = clean(cells[designationIdx]?.innerText).toLowerCase();
                let name = clean(cells[memberIdx]?.innerText);
                const org = orgIdx !== -1 ? clean(cells[orgIdx]?.innerText) : "";

                if (name) {
                    if (org) name = `${name} (${org})`;

                    let assigned = false;
                    // Assign to Officer Role if designation matches
                    if (designation.includes('vice president')) { result.vicePresident = name; assigned = true; }
                    else if (designation === 'president') { result.president = name; assigned = true; }
                    else if (designation.includes('joint secretary') || designation.includes('jt. secretary')) { result.jtSecretary = name; assigned = true; }
                    else if (designation === 'secretary') { result.secretary = name; assigned = true; }
                    else if (designation.includes('treasurer')) { result.treasurer = name; assigned = true; }
                    else if (designation.includes('immediate past president')) { result.immediatePastPresident = name; assigned = true; }

                    // If not assigned to officer, put in Members or Section list
                    if (!assigned) {
                        if (section === 'members') pushUnique(result.members, name);
                        else if (section === 'exofficio') pushUnique(result.exOfficio, name);
                        else if (section === 'coopted') pushUnique(result.coopted, name);
                        else if (section === 'advisors') pushUnique(result.advisors, name);
                        else {
                            // Fallback for generic tables: if designation is "member", ignore it, otherwise maybe include?
                            // For now, if generic, assume it's a member list
                            pushUnique(result.members, name);
                        }
                    }
                }
            }
            // Pattern 2: Columns are Roles (President | Secretary | ...)
            else if (Object.keys(roleMap).length > 0) {
                cells.forEach((cell, idx) => {
                    const roleKey = roleMap[idx];
                    if (roleKey) {
                        // Sometimes text is "Name\nOrg"
                        let val = clean(cell.innerText);
                        // If there are multiple lines, try to format nicely? 
                        // clean() flattens it. "Name Org" -> "Name Org"
                        // This is acceptable for now.
                        if (val) result[roleKey] = val;
                    }
                });
            }
            // Pattern 3: No clear headers, or just "Members" list
            else {
                // If section is known, dump all valid text cells into that section
                cells.forEach(cell => {
                    const val = clean(cell.innerText);
                    // Heuristic to avoid "Name" or "Member" labels which might be in first row if we missed header detection
                    if (isValidMemberName(val)) {
                        if (section === 'members') pushUnique(result.members, val);
                        else if (section === 'exofficio') pushUnique(result.exOfficio, val);
                        else if (section === 'coopted') pushUnique(result.coopted, val);
                        else if (section === 'advisors') pushUnique(result.advisors, val);
                        // If 'general' (officers?), we can't guess role implicitly without headers.
                    }
                });
            }
        }
    });

    return result;
}

function pushUnique(arr, item) {
    if (item && !arr.includes(item)) arr.push(item);
}

function isValidMemberName(val) {
    if (!val || val.length < 3) return false;
    const lower = val.toLowerCase();
    if (lower === 'name' || lower === 'member' || lower === 'designation' || lower === 'organisation' || lower === 'active') return false;
    return true;
}

function cssPreviousHeading(element) {
    let prev = element.previousElementSibling;
    while (prev) {
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(prev.tagName)) {
            return cleanHeading(prev.innerText);
        }
        prev = prev.previousElementSibling;
    }
    return "";
}

function cleanHeading(text) {
    return text?.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function identifySection(heading) {
    if (heading.includes('executivecommitteemembers') && !heading.includes('20')) return 'members';
    if (heading.includes('ecmembers')) return 'members';
    if (heading.includes('exofficio')) return 'exofficio';
    if (heading.includes('coopted')) return 'coopted';
    if (heading.includes('advisors')) return 'advisors';
    return 'general';
}

function extractList(table, targetArray) {
    // Deprecated in favor of integrated loop above, but keeping if needed for fallback
    // (Logic moved inside main loop)
}
