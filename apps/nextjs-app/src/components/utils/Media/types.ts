import type {Media as MediaType} from "@my-project/payload";
import type {StaticImageData} from "next/image";

export interface Props {
    alt?: string;
    className?: string;
    fill?: boolean; // for NextImage only
    htmlElement?: React.ElementType | null;
    imgClassName?: string;
    onClick?: () => void;
    onLoad?: () => void;
    loading?: "lazy" | "eager"; // for NextImage only
    priority?: boolean; // for NextImage only
    ref?: React.Ref<HTMLImageElement | HTMLVideoElement | null>;
    resource?: MediaType | string | number; // for Payload media
    size?: string; // for NextImage only
    src?: StaticImageData; // for static media
    videoClassName?: string;
}
