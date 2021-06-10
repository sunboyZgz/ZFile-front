type CbOfEach<T = any> = (item: T, index: number, arr: T[]) => void
const forEach = (arr: any[], callback: CbOfEach) => {
	arr.forEach(callback)
}

export { forEach }
