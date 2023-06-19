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
