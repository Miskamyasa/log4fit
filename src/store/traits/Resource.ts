import {action, makeObservable, observable} from "mobx"

export class Resource<Item, Key extends keyof Item & string> {
    constructor() {
        makeObservable(this)
    }

    public registry: Map<string, Item> = new Map()
    protected register(key: Key, items: Item[], each?: (item: Item) => void): void {
        const ids: string[] = []
        for (const item of items) {
            const k = String(item[key])
            ids.push(k)
            this.registry.set(k, item)
            if (typeof each === "function") {
                each(item)
            }
        }
        this.setIds(ids)
    }

    @observable public loading: boolean = false
    @action
    protected setLoading(loading: boolean): void {
        this.loading = loading
    }

    @observable public ids: string[] = []
    @action
    private setIds(ids: string[]): void {
        this.ids = ids
    }

    @observable public error: string = ""
    @action
    protected setError(error: string): void {
        this.error = error
    }
}
