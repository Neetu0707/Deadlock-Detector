let adjList = {};

function addEdge() {
    const from = document.getElementById('fromNode').value.trim().toUpperCase();
    const to = document.getElementById('toNode').value.trim().toUpperCase();

    if (!from || !to) return alert("Please enter both nodes");

    if (!adjList[from]) adjList[from] = [];
    if (!adjList[to]) adjList[to] = [];
    adjList[from].push(to);

    const li = document.createElement('li');
    li.textContent = `${from} ➜ ${to}`;
    document.getElementById('edgeList').appendChild(li);

    document.getElementById('fromNode').value = '';
    document.getElementById('toNode').value = '';
}

function detectDeadlock() {
    const nodes = Object.keys(adjList);
    const visited = {};
    const recStack = {};
    let cycleFound = false;

    for (let node of nodes) {
        if (isCyclic(node, visited, recStack)) {
            cycleFound = true;
            break;
        }
    }

    const resultDiv = document.getElementById('result');
    if (cycleFound) {
        resultDiv.textContent = "⚠️ DEADLOCK DETECTED! A circular dependency exists.";
        resultDiv.className = "result deadlock";
    } else {
        resultDiv.textContent = "✅ SYSTEM SAFE: No deadlocks found.";
        resultDiv.className = "result safe";
    }
}

function isCyclic(v, visited, recStack) {
    if (!visited[v]) {
        visited[v] = true;
        recStack[v] = true;

        for (let neighbour of adjList[v]) {
            if (!visited[neighbour] && isCyclic(neighbour, visited, recStack)) {
                return true;
            } else if (recStack[neighbour]) {
                return true;
            }
        }
    }
    recStack[v] = false;
    return false;
}

function resetGraph() {
    adjList = {};
    document.getElementById('edgeList').innerHTML = '';
    document.getElementById('result').style.display = 'none';
}