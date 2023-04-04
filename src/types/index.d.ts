declare module "*.png" {
    const value: number
    export = value
}

declare module "*.jpg" {
    const value: number
    export = value
}

declare module "@env" {
    export const IS_MISKAMYASA: boolean
}
