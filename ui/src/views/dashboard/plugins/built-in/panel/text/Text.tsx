// Copyright 2023 Datav.io Team
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Box } from "@chakra-ui/react"
import { MarkdownRender } from "src/components/markdown/MarkdownRender"
import { PanelProps } from "types/dashboard"
import { replaceWithVariables } from "utils/variable"
import React from "react";


const TextPanel = (props: PanelProps) => {
    return (<Box px="2" height="100%" id="text-panel" display="flex" alignItems={props.panel.plugins.text.alignItems} justifyContent={props.panel.plugins.text.justifyContent} >
        <MarkdownRender fontSize={props.panel.plugins.text.fontSize} fontWeight={props.panel.plugins.text.fontWeight} md={replaceWithVariables(props.panel.plugins.text?.md ?? "")} width="100%"/>
    </Box>)
}

export default TextPanel