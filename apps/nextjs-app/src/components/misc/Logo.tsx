import clsx from "clsx";

interface Props {
    className?: string;
    loading?: "lazy" | "eager";
    priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
    const {
        loading: loadingFromProps,
        priority: priorityFromProps,
        className,
    } = props;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
    const loading = loadingFromProps || "lazy";
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
    const priority = priorityFromProps || "low";

    return (
        /* eslint-disable @next/next/no-img-element */
        <img
            alt={"Payload Logo"}
            className={clsx("h-[34px] w-full max-w-[9.375rem]", className)}
            decoding={"async"}
            fetchPriority={priority}
            height={34}
            loading={loading}
            src={
                "https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
            }
            width={193}
        />
        /* eslint-enable @next/next/no-img-element */
    );
};
