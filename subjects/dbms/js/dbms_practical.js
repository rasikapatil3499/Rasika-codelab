/* =========================================================
   DBMS PRACTICALS
   SHARED JAVASCRIPT
   practical01.html → practical10.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".practical-page");

    if (!page) return;

    /* -----------------------------------------------------
       Detect practical number from filename
       ----------------------------------------------------- */

    const fileName = window.location.pathname.split("/").pop();
    const match = fileName.match(/practical(\d+)\.html/i);

    if (!match) return;

    const practicalNumber = parseInt(match[1]);

    /* -----------------------------------------------------
       Common status function
       ----------------------------------------------------- */

    const statusTitle = document.querySelector(".status-bar strong");
    const statusMessage = document.querySelector(".status-message");

    function setStatus(title, message) {

        if (statusTitle) {
            statusTitle.textContent = title;
        }

        if (statusMessage) {
            statusMessage.textContent = message;
        }
    }


    /* -----------------------------------------------------
       Button helper
       ----------------------------------------------------- */

    function getButton(text) {

        const buttons = document.querySelectorAll("button");

        return [...buttons].find(button =>
            button.textContent.trim().toLowerCase() ===
            text.toLowerCase()
        );
    }


    /* =====================================================
       PRACTICAL 01
       DATABASE DESIGN & ER DIAGRAM
       ===================================================== */

    if (practicalNumber === 1) {

        const canvas = document.querySelector(".er-canvas");

        const entityInput =
            document.querySelector("#entityName");

        const attributeInput =
            document.querySelector("#attributeName");

        const addEntityButton =
            getButton("+ Add Entity");

        const addAttributeButton =
            getButton("+ Add Attribute");

        let selectedEntity = null;


        /* Select existing entity */

        function selectEntity(entity) {

            document
                .querySelectorAll(".er-entity")
                .forEach(item => {
                    item.style.outline = "none";
                });

            entity.style.outline =
                "2px solid rgba(255,107,44,.7)";

            selectedEntity = entity;

            const name =
                entity.querySelector(".entity-title").textContent;

            setStatus(
                "Entity selected",
                `You can now add attributes to ${name}.`
            );
        }


        /* Make existing entities selectable */

        document
            .querySelectorAll(".er-entity")
            .forEach(entity => {

                entity.addEventListener("click", function () {
                    selectEntity(entity);
                });

            });


        /* Add entity */

        if (addEntityButton) {

            addEntityButton.addEventListener("click", function () {

                const name =
                    entityInput.value.trim();

                if (!name) {

                    setStatus(
                        "Missing entity",
                        "Enter an entity name first."
                    );

                    entityInput.focus();

                    return;
                }


                const entity =
                    document.createElement("div");

                entity.className = "er-entity";

                entity.innerHTML = `
                    <div class="entity-title">
                        ${escapeHTML(name)}
                    </div>

                    <div class="entity-attribute pk">
                        🔑 id
                    </div>
                `;


                entity.addEventListener("click", function () {
                    selectEntity(entity);
                });


                canvas.appendChild(entity);

                selectEntity(entity);

                entityInput.value = "";

                setStatus(
                    "Entity added",
                    `${name} was added to the ER diagram.`
                );

            });

        }


        /* Add attribute */

        if (addAttributeButton) {

            addAttributeButton.addEventListener("click", function () {

                const attribute =
                    attributeInput.value.trim();


                if (!attribute) {

                    setStatus(
                        "Missing attribute",
                        "Enter an attribute name first."
                    );

                    attributeInput.focus();

                    return;
                }


                if (!selectedEntity) {

                    setStatus(
                        "Select entity",
                        "Click an entity before adding an attribute."
                    );

                    return;
                }


                const newAttribute =
                    document.createElement("div");

                newAttribute.className =
                    "entity-attribute";

                newAttribute.textContent =
                    attribute;


                selectedEntity.appendChild(
                    newAttribute
                );


                attributeInput.value = "";


                setStatus(
                    "Attribute added",
                    `${attribute} was added to the selected entity.`
                );

            });

        }


        setStatus(
            "Ready",
            "Add an entity or select an existing entity."
        );

    }



    /* =====================================================
       PRACTICAL 02
       TABLES, DATA TYPES & CONSTRAINTS
       ===================================================== */

    if (practicalNumber === 2) {

        const columnInput =
            document.querySelector("#columnName");

        const dataType =
            document.querySelector("#dataType");

        const addButton =
            getButton("+ Add Column");

        const tableBody =
            document.querySelector(".live-table tbody");

        const checkboxes =
            document.querySelectorAll(
                ".check-row input"
            );


        if (addButton) {

            addButton.addEventListener("click", function () {

                const columnName =
                    columnInput.value.trim();


                if (!columnName) {

                    setStatus(
                        "Missing column",
                        "Enter a column name."
                    );

                    columnInput.focus();

                    return;
                }


                const constraints = [];


                if (checkboxes[0]?.checked) {
                    constraints.push("PRIMARY KEY");
                }

                if (checkboxes[1]?.checked) {
                    constraints.push("NOT NULL");
                }

                if (checkboxes[2]?.checked) {
                    constraints.push("UNIQUE");
                }


                const row =
                    document.createElement("tr");


                row.innerHTML = `
                    <td>${escapeHTML(columnName)}</td>
                    <td>${escapeHTML(dataType.value)}</td>
                    <td>
                        ${
                            constraints.length
                            ? constraints.join(", ")
                            : "—"
                        }
                    </td>
                `;


                tableBody.appendChild(row);


                columnInput.value = "";

                checkboxes.forEach(
                    checkbox => checkbox.checked = false
                );


                row.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(-8px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 300
                    }
                );


                setStatus(
                    "Column added",
                    `${columnName} is now part of the table.`
                );

            });

        }


        setStatus(
            "Schema ready",
            "Add columns to build the table."
        );

    }



    /* =====================================================
       PRACTICAL 03
       CRUD OPERATIONS
       ===================================================== */

    if (practicalNumber === 3) {

        const nameInput =
            document.querySelector("#recordName");

        const courseInput =
            document.querySelector("#recordCourse");

        const table =
            document.querySelector(".crud-table table");

        const tbody =
            table?.querySelector("tbody");


        let nextID = 103;

        let selectedRow = null;


        /* Select row */

        if (table) {

            table.addEventListener("click", function (event) {

                const row =
                    event.target.closest("tr");

                if (!row) return;


                table
                    .querySelectorAll("tr")
                    .forEach(item => {
                        item.style.outline = "none";
                    });


                row.style.outline =
                    "1px solid rgba(255,107,44,.65)";


                selectedRow = row;


                setStatus(
                    "Row selected",
                    `Record ${row.cells[0].textContent} selected.`
                );

            });

        }


        /* INSERT */

        const insertButton =
            getButton("INSERT");


        if (insertButton) {

            insertButton.addEventListener("click", function () {

                const name =
                    nameInput.value.trim() ||
                    "New Student";

                const course =
                    courseInput.value.trim() ||
                    "DBMS";


                const row =
                    document.createElement("tr");


                row.className = "new-row";


                row.innerHTML = `
                    <td>${nextID++}</td>
                    <td>${escapeHTML(name)}</td>
                    <td>${escapeHTML(course)}</td>
                `;


                tbody.appendChild(row);

                selectedRow = row;


                nameInput.value = "";
                courseInput.value = "";


                row.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(-10px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 400
                    }
                );


                setStatus(
                    "INSERT executed",
                    "New record inserted successfully."
                );

            });

        }


        /* UPDATE */

        const updateButton =
            getButton("UPDATE");


        if (updateButton) {

            updateButton.addEventListener("click", function () {

                if (!selectedRow) {

                    setStatus(
                        "Select row",
                        "Click a row before updating it."
                    );

                    return;
                }


                const newCourse =
                    courseInput.value.trim();


                if (!newCourse) {

                    setStatus(
                        "Missing value",
                        "Enter a new course value."
                    );

                    courseInput.focus();

                    return;
                }


                selectedRow.cells[2].textContent =
                    newCourse;


                selectedRow.classList.add(
                    "change-cell"
                );


                setStatus(
                    "UPDATE executed",
                    "Selected record was updated."
                );

            });

        }


        /* DELETE */

        const deleteButton =
            getButton("DELETE");


        if (deleteButton) {

            deleteButton.addEventListener("click", function () {

                if (!selectedRow) {

                    setStatus(
                        "Select row",
                        "Click a row before deleting it."
                    );

                    return;
                }


                const id =
                    selectedRow.cells[0].textContent;


                selectedRow.animate(
                    [
                        {
                            opacity: 1,
                            transform: "translateX(0)"
                        },
                        {
                            opacity: 0,
                            transform: "translateX(25px)"
                        }
                    ],
                    {
                        duration: 300
                    }
                ).onfinish = function () {

                    selectedRow.remove();

                    selectedRow = null;

                };


                setStatus(
                    "DELETE executed",
                    `Record ${id} deleted.`
                );

            });

        }


        setStatus(
            "CRUD ready",
            "Select a row or insert a new record."
        );

    }



    /* =====================================================
       PRACTICAL 04
       FILTERING, SORTING & FUNCTIONS
       ===================================================== */

    if (practicalNumber === 4) {

        const editor =
            document.querySelector("#sqlQuery");

        const resultBody =
            document.querySelector(".query-result tbody");

        const stages =
            document.querySelectorAll(
                ".query-stage"
            );


        const data = [
            {
                name: "Asha",
                marks: 92
            },
            {
                name: "Riya",
                marks: 84
            },
            {
                name: "Neha",
                marks: 76
            },
            {
                name: "Kiran",
                marks: 68
            },
            {
                name: "Om",
                marks: 55
            }
        ];


        function renderResults(rows) {

            resultBody.innerHTML = "";


            rows.forEach(student => {

                const tr =
                    document.createElement("tr");


                tr.innerHTML = `
                    <td>${escapeHTML(student.name)}</td>
                    <td>${student.marks}</td>
                `;


                resultBody.appendChild(tr);

            });

        }


        function animateQuery() {

            stages.forEach(
                stage => stage.classList.remove("active")
            );


            stages.forEach((stage, index) => {

                setTimeout(() => {

                    stages.forEach(
                        s => s.classList.remove("active")
                    );

                    stage.classList.add("active");

                }, index * 450);

            });

        }


        const runButton =
            getButton("▶ Run Query");


        if (runButton) {

            runButton.addEventListener("click", function () {

                const query =
                    editor.value.toLowerCase();


                let result =
                    [...data];


                /* WHERE */

                const greaterThan =
                    query.match(
                        /marks\s*>\s*(\d+)/
                    );


                if (greaterThan) {

                    const value =
                        Number(greaterThan[1]);

                    result =
                        result.filter(
                            student =>
                                student.marks > value
                        );

                }


                const lessThan =
                    query.match(
                        /marks\s*<\s*(\d+)/
                    );


                if (lessThan) {

                    const value =
                        Number(lessThan[1]);

                    result =
                        result.filter(
                            student =>
                                student.marks < value
                        );

                }


                /* ORDER BY */

                if (
                    query.includes(
                        "order by marks desc"
                    )
                ) {

                    result.sort(
                        (a, b) =>
                            b.marks - a.marks
                    );

                }


                if (
                    query.includes(
                        "order by marks asc"
                    )
                ) {

                    result.sort(
                        (a, b) =>
                            a.marks - b.marks
                    );

                }


                renderResults(result);

                animateQuery();


                setStatus(
                    "Query executed",
                    `${result.length} row(s) returned.`
                );

            });

        }


        const resetButton =
            getButton("Reset");


        if (resetButton) {

            resetButton.addEventListener("click", function () {

                editor.value =
`SELECT name, marks
FROM students
WHERE marks > 70
ORDER BY marks DESC;`;


                renderResults(
                    data.filter(
                        student =>
                            student.marks > 70
                    )
                );


                stages.forEach(
                    (stage, index) =>
                        stage.classList.toggle(
                            "active",
                            index === 0
                        )
                );


                setStatus(
                    "Query reset",
                    "Ready to execute."
                );

            });

        }


        setStatus(
            "Query ready",
            "Edit the query and press Run Query."
        );

    }



    /* =====================================================
       PRACTICAL 05
       GROUPING, JOINS & SUBQUERIES
       ===================================================== */

    if (practicalNumber === 5) {

        const joinSelect =
            document.querySelector("#joinType");

        const resultText =
            document.querySelector(".join-result p");

        const executeButton =
            getButton("▶ Execute JOIN");


        if (executeButton) {

            executeButton.addEventListener(
                "click",
                function () {

                    const type =
                        joinSelect.value;


                    if (type === "INNER JOIN") {

                        resultText.textContent =
                            "Only matching records from both tables are returned.";

                    }


                    if (type === "LEFT JOIN") {

                        resultText.textContent =
                            "All students are returned. Matching course data is added where available.";

                    }


                    if (type === "RIGHT JOIN") {

                        resultText.textContent =
                            "All courses are returned. Matching student data is added where available.";

                    }


                    document
                        .querySelectorAll(".join-table")
                        .forEach(table => {

                            table.animate(
                                [
                                    {
                                        transform: "scale(1)"
                                    },
                                    {
                                        transform: "scale(1.04)"
                                    },
                                    {
                                        transform: "scale(1)"
                                    }
                                ],
                                {
                                    duration: 600
                                }
                            );

                        });


                    setStatus(
                        `${type} executed`,
                        "JOIN relationship evaluated successfully."
                    );

                }
            );

        }


        setStatus(
            "JOIN ready",
            "Choose a JOIN type and execute it."
        );

    }



    /* =====================================================
       PRACTICAL 06
       ADVANCED SQL
       ===================================================== */

    if (practicalNumber === 6) {

        const nodes =
            document.querySelectorAll(
                ".execution-node"
            );


        const executeButton =
            getButton("▶ Execute Query");


        if (executeButton) {

            executeButton.addEventListener(
                "click",
                function () {

                    nodes.forEach(
                        node =>
                            node.classList.remove("active")
                    );


                    nodes.forEach((node, index) => {

                        setTimeout(() => {

                            nodes.forEach(
                                n =>
                                    n.classList.remove(
                                        "active"
                                    )
                            );


                            node.classList.add(
                                "active"
                            );


                        }, index * 650);

                    });


                    setTimeout(() => {

                        setStatus(
                            "Query completed",
                            "The query passed through the complete execution flow."
                        );

                    }, nodes.length * 650);

                }
            );

        }


        setStatus(
            "Execution ready",
            "Run the query to visualize execution."
        );

    }



    /* =====================================================
       PRACTICAL 07
       VIEWS, INDEXES & PERFORMANCE
       ===================================================== */

    if (practicalNumber === 7) {

        const scanBox =
            document.querySelector(".scan-box");

        const indexTree =
            document.querySelector(".index-tree");

        const metrics =
            document.querySelectorAll(
                ".metric-row strong"
            );


        function animate(element) {

            if (!element) return;

            element.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(1.04)"
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 600
                }
            );

        }


        const withoutIndex =
            getButton("Without Index");


        if (withoutIndex) {

            withoutIndex.addEventListener(
                "click",
                function () {

                    animate(scanBox);


                    if (metrics[0]) {
                        metrics[0].textContent =
                            "1000 rows";
                    }


                    if (metrics[1]) {
                        metrics[1].textContent =
                            "Table Scan";
                    }


                    setStatus(
                        "Table scan",
                        "Database checks many rows to find the requested record."
                    );

                }
            );

        }


        const withIndex =
            getButton("With Index");


        if (withIndex) {

            withIndex.addEventListener(
                "click",
                function () {

                    animate(indexTree);


                    if (metrics[0]) {
                        metrics[0].textContent =
                            "8 rows";
                    }


                    if (metrics[1]) {
                        metrics[1].textContent =
                            "Index Lookup";
                    }


                    setStatus(
                        "Index lookup",
                        "The index narrows the search path."
                    );

                }
            );

        }


        setStatus(
            "Performance ready",
            "Compare table scanning with indexed lookup."
        );

    }



    /* =====================================================
       PRACTICAL 08
       TRANSACTIONS & DATABASE PROGRAMMING
       ===================================================== */

    if (practicalNumber === 8) {

        const states =
            document.querySelectorAll(
                ".transaction-state:first-of-type .state"
            );

        const status =
            document.querySelector(
                ".transaction-status strong"
            );


        function clearStates() {

            states.forEach(state => {

                state.classList.remove(
                    "active",
                    "success",
                    "error"
                );

            });

        }


        const beginButton =
            getButton("BEGIN");


        if (beginButton) {

            beginButton.addEventListener(
                "click",
                function () {

                    clearStates();

                    states[0]?.classList.add(
                        "active"
                    );


                    if (status) {
                        status.textContent =
                            "ACTIVE";
                    }


                    setStatus(
                        "Transaction started",
                        "Transaction is now active."
                    );

                }
            );

        }


        const commitButton =
            getButton("COMMIT");


        if (commitButton) {

            commitButton.addEventListener(
                "click",
                function () {

                    clearStates();

                    states[2]?.classList.add(
                        "success"
                    );


                    if (status) {
                        status.textContent =
                            "COMMITTED";
                    }


                    setStatus(
                        "COMMIT executed",
                        "Transaction changes are permanently accepted."
                    );

                }
            );

        }


        const rollbackButton =
            getButton("ROLLBACK");


        if (rollbackButton) {

            rollbackButton.addEventListener(
                "click",
                function () {

                    clearStates();

                    states[1]?.classList.add(
                        "error"
                    );


                    if (status) {
                        status.textContent =
                            "ROLLED BACK";
                    }


                    setStatus(
                        "ROLLBACK executed",
                        "Transaction changes have been cancelled."
                    );

                }
            );

        }


        setStatus(
            "Transaction ready",
            "Use BEGIN, then COMMIT or ROLLBACK."
        );

    }



    /* =====================================================
       PRACTICAL 09
       SECURITY, BACKUP & RECOVERY
       ===================================================== */

    if (practicalNumber === 9) {

        const role =
            document.querySelector("#userRole");

        const accessNodes =
            document.querySelectorAll(
                ".access-node"
            );

        const recoveryNodes =
            document.querySelectorAll(
                ".recovery-node"
            );


        const accessButton =
            getButton("Check Access");


        if (accessButton) {

            accessButton.addEventListener(
                "click",
                function () {

                    accessNodes.forEach(
                        node =>
                            node.classList.remove(
                                "success"
                            )
                    );


                    accessNodes
                        .at(-1)
                        ?.classList.add(
                            "success"
                        );


                    setStatus(
                        "Access granted",
                        `${role.value} passed the access check.`
                    );

                }
            );

        }


        const backupButton =
            getButton("Create Backup");


        if (backupButton) {

            backupButton.addEventListener(
                "click",
                function () {

                    recoveryNodes.forEach(
                        node =>
                            node.classList.remove(
                                "success"
                            )
                    );


                    recoveryNodes[1]
                        ?.classList.add(
                            "success"
                        );


                    setStatus(
                        "Backup created",
                        "Recovery backup is ready."
                    );

                }
            );

        }


        const failureButton =
            getButton("Simulate Failure");


        if (failureButton) {

            failureButton.addEventListener(
                "click",
                function () {

                    recoveryNodes.forEach(
                        node =>
                            node.classList.remove(
                                "success"
                            )
                    );


                    recoveryNodes.forEach(
                        (node, index) => {

                            setTimeout(() => {

                                recoveryNodes.forEach(
                                    n =>
                                        n.classList.remove(
                                            "success"
                                        )
                                );


                                node.classList.add(
                                    "success"
                                );


                            }, index * 650);

                        }
                    );


                    setTimeout(() => {

                        setStatus(
                            "Recovery complete",
                            "Database has been restored and is ready."
                        );

                    }, recoveryNodes.length * 650);

                }
            );

        }


        setStatus(
            "Security ready",
            "Check access, create a backup or simulate failure."
        );

    }



    /* =====================================================
       PRACTICAL 10
       MONGODB & NOSQL
       ===================================================== */

    if (practicalNumber === 10) {

        const sqlView =
            document.querySelector(".sql-view");

        const mongoView =
            document.querySelector(".mongodb-view");


        function activate(view) {

            if (!view) return;


            sqlView.style.borderColor =
                "var(--border)";

            mongoView.style.borderColor =
                "var(--border)";


            view.style.borderColor =
                "var(--orange)";


            view.animate(
                [
                    {
                        opacity: 0.65,
                        transform: "scale(.98)"
                    },
                    {
                        opacity: 1,
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 300
                }
            );

        }


        const sqlButton =
            getButton("SQL View");


        if (sqlButton) {

            sqlButton.addEventListener(
                "click",
                function () {

                    activate(sqlView);


                    setStatus(
                        "SQL view active",
                        "Data is represented as relational rows and columns."
                    );

                }
            );

        }


        const mongoButton =
            getButton("MongoDB View");


        if (mongoButton) {

            mongoButton.addEventListener(
                "click",
                function () {

                    activate(mongoView);


                    setStatus(
                        "MongoDB view active",
                        "Data is represented as a document."
                    );

                }
            );

        }


        setStatus(
            "Comparison ready",
            "Switch between SQL and MongoDB representations."
        );

    }

});



/* =========================================================
   SECURITY HELPER
   Prevent user-entered text from becoming HTML.
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}