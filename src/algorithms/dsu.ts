export class DisjointSetUnion {
  parent: number[]
  rank: number[]

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, index) => index)
    this.rank = Array.from({ length: size }, () => 0)
  }

  find(index: number): number {
    if (this.parent[index] !== index) {
      this.parent[index] = this.find(this.parent[index])
    }

    return this.parent[index]
  }

  union(first: number, second: number): boolean {
    const rootFirst = this.find(first)
    const rootSecond = this.find(second)

    if (rootFirst === rootSecond) {
      return false
    }

    if (this.rank[rootFirst] < this.rank[rootSecond]) {
      this.parent[rootFirst] = rootSecond
    } else if (this.rank[rootFirst] > this.rank[rootSecond]) {
      this.parent[rootSecond] = rootFirst
    } else {
      this.parent[rootSecond] = rootFirst
      this.rank[rootFirst] += 1
    }

    return true
  }
}
