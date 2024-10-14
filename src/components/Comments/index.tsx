import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

export default function Comments(): JSX.Element {
    const { colorMode } = useColorMode();

    return (
        <div>
            <Giscus
                id="comments"
                repo="2m/2m.github.io"
                repoId="MDEwOlJlcG9zaXRvcnk4NTQzODEw"
                category="General"
                categoryId="DIC_kwDOAIJeQs4CjWRu"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={colorMode === "dark" ? "noborder_dark" : "noborder_light"}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
