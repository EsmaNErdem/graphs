class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray) {
      this.addVertex(node)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of vertex.adjacent) {
      node.adjacent.delete(vertex)
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen = new Set([start]), vals = new Array(start.value)) {
    if(!start) return
    
    for (let vertex of start.adjacent) {
      if(!seen.has(vertex)) {
        seen.add(vertex)
        vals.push(vertex.value)
        this.depthFirstSearch(vertex, seen, vals)
      }
    }
    return vals
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let seen = new Set([start])
    let vals = new Array(start.value)
    let queue = new Array(start)

    while(queue.length) {
      let currNode = queue.shift()

      for(let node of currNode.adjacent) {
        if(!seen.has(node)){
        vals.push(node.value)
        queue.push(node)
        seen.add(node)
        }
      }
    }
    return vals
  }

  shortestPath(source, target) {
    if(source === target) return [source.value]

    const queue = [source]
    const seen = new Set([source])
    const parent = new Map()
    const path = []

    while (queue.length) {
      let currVertex = queue.shift()

      if(currVertex === target) {
        // parent keeps track of where we came from. so we are unfolding it to find out we stopped before we got here
        path.push(target.val)
        let stop = parent[target]
        while(stop) {
          path.push(stop.value)
          stop = parent[stop]
        }
        path.push(source.value)
        path.reverse()
        return path
      }
      
      // if the current vertex isn't target value, keep going

      for(let neighborVertex of currVertex.adjacent) {
        if(!seen.has(neighborVertex)){
          queue.push(neighborVertex)
          seen.add(neighborVertex)
          parent.set(neighborVertex, currVertex)
        }
      }

    }
  }
}

module.exports = {Graph, Node}


// HackerRank shortest reach BFS:
// from collections import deque 
// def bfs(n, m, edges, s):
//     # Write your code here
//     graphMap = {i:[] for i in range(n+1)}
//     for u, v in edges:
//         graphMap[u].append(v)
//         graphMap[v].append(u)
    
//     # assigning distance as -1 for default, including start node(will remove it later)
//     distances = [-1] * n
//     # setting start node distance as 0, they are indexed base 0, distance[s-1] representing s node
//     distances[s-1] = 0 
    
//     q = deque([s])
    
//     while q:
//         currNode = q.popleft()
//         for neighbor in graphMap[currNode]:
//             # this means the node has not been visited yet
//             if distances[neighbor-1] == -1:
//                 distances[neighbor-1] = distances[currNode-1] + 6
//                 q.append(neighbor)
//     # after reaching all of the neighbor, remove start node distance
//     distances.pop(s-1)
//     return distances




// HackerRank Roads and Libraries:s
// # The function is expected to return a LONG_INTEGER.
// # The function accepts following parameters:
// #  1. INTEGER n
// #  2. INTEGER c_lib
// #  3. INTEGER c_road
// #  4. 2D_INTEGER_ARRAY cities
// #

// def roadsAndLibraries(n, c_lib, c_road, cities):
//     # Write your code here
    
//     graphMap = {i:[] for i in range(1, n+1)}
//     for u, v in cities:
//         graphMap[u].append(v)
//         graphMap[v].append(u)
        
//     visited = set()
//     cost = 0
    
//     def dfs(node):
//         num_of_cities=1
//         visited.add(node)
//         for city in graphMap[node]:
//             if city not in visited:
//                 num_of_cities += dfs(city)
//         return num_of_cities
    
    
//     for node in range(1, n+1):
//         # making sure every city in every sub graph has been visited and num of citites calculated
//         if node not in visited:
//             num_of_cities = dfs(node)
//             # when c_lib < c_road, just library to every city
            
//             cost1 = num_of_cities * c_lib
                
//             # cost of roads for cities and 1 library for each sub graph
//             cost2 = (num_of_cities-1) * c_road + c_lib
//             cost += min(cost1, cost2)
            
    
//     return cost
        


// HackerRank Even Tree:

// # Complete the evenForest function below.
// def evenForest(t_nodes, t_edges, t_from, t_to):
    
//     graph_map = {i:[] for i in range(1,t_nodes+1)}
//     for start, end in zip(t_from, t_to):
//         graph_map[start].append(end)
//         graph_map[end].append(start)
        
//     visited = set()
//     removed_edges = 0
    
//     def dfs(node, visited):
//         nonlocal removed_edges
//         nodes = 1
//         visited.add(node)
//         for child in graph_map[node]:
//             if child not in visited:
//                 nodes += dfs(child, visited)
//         if nodes % 2 == 0 and node != 1:
//             removed_edges += 1 
//         return nodes
    
//     dfs(1, set())
//     return removed_edges
    
// You are given a tree (a simple connected graph with no cycles).

// Find the maximum number of edges you can remove from the tree to get a forest such that each connected component of the forest contains an even number of nodes.

// As an example, the following tree with  nodes can be cut at most  time to create an even forest.
