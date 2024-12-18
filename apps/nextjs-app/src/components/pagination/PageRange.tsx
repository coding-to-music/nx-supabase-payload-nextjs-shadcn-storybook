import type React from "react";

const defaultLabels = {
    plural: "Docs",
    singular: "Doc",
};

const defaultCollectionLabels = {
    posts: {
        plural: "Posts",
        singular: "Post",
    },
};

export const PageRange: React.FC<{
    className?: string;
    collection?: string;
    collectionLabels?: {
        plural?: string;
        singular?: string;
    };
    currentPage?: number;
    limit?: number;
    totalDocs?: number;
}> = (props) => {
    const {
        className,
        collection,
        collectionLabels: collectionLabelsFromProps,
        currentPage,
        limit,
        totalDocs,
    } = props;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-magic-numbers, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
    let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-magic-numbers -- [bulk suppress]
    if (totalDocs && indexStart > totalDocs) indexStart = 0;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-magic-numbers -- [bulk suppress]
    let indexEnd = (currentPage || 1) * (limit || 1);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
    if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- [bulk suppress]
    const {plural, singular} =
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
        collectionLabelsFromProps ||
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing -- [bulk suppress]
        defaultCollectionLabels[collection || ""] ||
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
        defaultLabels ||
        {};

    return (
        <div className={[className, "font-semibold"].filter(Boolean).join(" ")}>
            {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers -- [bulk suppress] */}
            {(totalDocs === undefined || totalDocs === 0) &&
                "Search produced no results."}
            {totalDocs !== undefined &&
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- [bulk suppress]
                totalDocs > 0 &&
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- [bulk suppress]
                `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ""} of ${totalDocs} ${
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- [bulk suppress]
                    totalDocs > 1 ? plural : singular
                }`}
        </div>
    );
};
