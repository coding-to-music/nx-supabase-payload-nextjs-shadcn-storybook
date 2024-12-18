"use client";

import {toast} from "@payloadcms/ui";
import React from "react";

import "./index.scss";

const SuccessMessage: React.FC = () => (
    <div>
        Database seeded! You can now{" "}
        <a href={"/"} rel={"noreferrer"} target={"_blank"}>
            visit your website
        </a>
    </div>
);

export const SeedButton: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [seeded, setSeeded] = React.useState(false);
    const [error, setError] = React.useState<unknown>(null);

    const handleClick = React.useCallback(
        // eslint-disable-next-line @typescript-eslint/require-await -- [bulk suppress]
        async (event: React.MouseEvent) => {
            event.preventDefault();

            if (seeded) {
                toast.info("Database already seeded.");
                return;
            }
            if (loading) {
                toast.info("Seeding already in progress.");
                return;
            }
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- [bulk suppress]
            if (error) {
                toast.error("An error occurred, please refresh and try again.");
                return;
            }

            setLoading(true);

            try {
                toast.promise(
                    new Promise((resolve, reject) => {
                        try {
                            fetch("/next/seed", {
                                method: "POST",
                                credentials: "include",
                            })
                                .then((response) => {
                                    if (response.ok) {
                                        resolve(true);
                                        setSeeded(true);
                                    } else {
                                        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- [bulk suppress]
                                        reject(
                                            "An error occurred while seeding.",
                                        );
                                    }
                                })
                                .catch((error) => {
                                    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- [bulk suppress]
                                    reject(error);
                                });
                        } catch (error) {
                            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- [bulk suppress]
                            reject(error);
                        }
                    }),
                    {
                        loading: "Seeding with data....",
                        success: <SuccessMessage />,
                        error: "An error occurred while seeding.",
                    },
                );
            } catch (error_) {
                setError(error_);
            }
        },
        [loading, seeded, error],
    );

    let message = "";
    if (loading) message = " (seeding...)";
    if (seeded) message = " (done!)";
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string -- [bulk suppress]
    if (error) message = ` (error: ${error})`;

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- [bulk suppress] */}
            <button className={"seedButton"} onClick={handleClick}>
                Seed your database
            </button>
            {message}
        </>
    );
};
