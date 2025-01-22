import type {Meta, StoryObj} from "@storybook/react";

import {MainContentMinHeight} from "./main-content-min-height";

const meta: Meta<typeof MainContentMinHeight.Provider> = {
    component: MainContentMinHeight.Provider,
    title: "MainContentMinHeight",
    argTypes: {
        initialRegionHeights: {
            control: "object",
        },
    },
};
export default meta;
type Story = StoryObj<typeof MainContentMinHeight.Provider>;

const Header = () => {
    const ref = MainContentMinHeight.useRegionRef("header");
    return (
        <header ref={ref} className={"h-[100px] bg-blue-500 p-[8px]"}>
            Header
        </header>
    );
};

const Footer = () => {
    const ref = MainContentMinHeight.useRegionRef("footer");
    return (
        <footer ref={ref} className={"h-[100px] bg-blue-500 p-[8px]"}>
            Footer
        </footer>
    );
};

export const Default: Story = {
    render: ({initialRegionHeights}) => (
        <MainContentMinHeight.Provider
            initialRegionHeights={initialRegionHeights}
        >
            <MainContentMinHeight.Body asChild>
                <div>
                    <Header />
                    <MainContentMinHeight.Main asChild>
                        <div>
                            <p>Main content</p>
                        </div>
                    </MainContentMinHeight.Main>
                    <Footer />
                </div>
            </MainContentMinHeight.Body>
        </MainContentMinHeight.Provider>
    ),
    args: {
        initialRegionHeights: {
            header: 100,
            footer: 100,
        },
    },
    parameters: {
        layout: "fullscreen",
    },
};
