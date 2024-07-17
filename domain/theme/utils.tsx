export function lucideStringToIcon(icon: string) {
    const Icon = require("lucide-react")[icon]
    return {
        icon: Icon,
        iconJSX: <Icon/>
    }
}