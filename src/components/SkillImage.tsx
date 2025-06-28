import {useMemo, type ReactElement} from "react"

import {Image} from "expo-image"

import {images} from "../../assets/images"
import {layout} from "../constants/layout"
import {analytics} from "../helpers/analytics"
import {createStaticStyles} from "../helpers/createStaticStyles"

// noinspection JSSuspiciousNameCombination
const styles = createStaticStyles({
    icon: {
        zIndex: 2,
        width: layout.iconWidth,
        height: layout.iconWidth,
        overflow: "hidden",
        borderRadius: 6,
        marginLeft: layout.gap / 2,
        marginRight: layout.gap,
    },
    image: {
        width: "100%",
        minHeight: layout.height / 4,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: "#e1e3e5",
    },
})

export function SkillImage({name, banner}: {
    name: keyof typeof images
    banner?: boolean
}): ReactElement {
    const source = useMemo(() => {
        try {
            const image = images[name]
            if (image) {
                return image
            }
        }
        catch (e) {
            analytics.trackError(e)
        }
        return images.customIcon
    }, [name])

    return (
        <Image
            contentFit="cover"
            source={source}
            style={banner ? styles.image : styles.icon} />
    )
}
