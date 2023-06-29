import { HStack, Input, InputGroup, InputLeftAddon, useToast } from "@chakra-ui/react"
import { CodeEditorModal } from "components/CodeEditor/CodeEditorModal"
import Label from "components/form/Label"
import { isEmpty } from "lodash"
import { DatasourceVariableEditorProps } from "types/datasource"
import { isJSON } from "utils/is"
import { useEffect } from "react"
import { queryHttpVariableValues } from "./query_runner"

const HttpVariableEditor = ({ variable, onChange, onQueryResult }: DatasourceVariableEditorProps) => {
    const toast = useToast()
    const data = isJSON(variable.value) ? JSON.parse(variable.value) : {}

    let update;
    if (isEmpty(data.transformResult)) {
        data.transformResult =  initTransformResult
        update = true
    }
    if (isEmpty(data.transformRequest)) {
        data.transformRequest =  initTransformRequest
        update = true
    }
    if (update)  onChange(variable => {
        variable.value = JSON.stringify(data)
    })

    useEffect(() => {
        loadVariables(variable)
    }, [variable])
    
    const loadVariables = async (v) => {
        const result = await queryHttpVariableValues(variable)
        onQueryResult(result)
    }

    return (<>
        <InputGroup size="sm" mt="2">
            <InputLeftAddon children='URL' />
            <Input
                value={data.url}
                onChange={(e) => {
                    const v = e.currentTarget.value
                    data.url = v
                    onChange(variable => {
                        variable.value = JSON.stringify(data)
                    })
                }}
            />
        </InputGroup>
        <InputGroup size="sm" mt="2">
            <InputLeftAddon children='Request transform' />
            {/* <Label width="200px" desc="If you want insert some imformation before request is sent to remote, e.g current time, just edit this function">Request transform</Label> */}
            <CodeEditorModal value={data.transformRequest} onChange={v => {
                data.transformRequest = v
                onChange(variable => {
                    variable.value = JSON.stringify(data)
                })
            }} />
        </InputGroup>


        <InputGroup size="sm" mt="2">
            <InputLeftAddon children='Result transform' />
            {/* <Label width="200px" desc="The http request result is probably not compatible with your visualization panels, here you can define a function to transform the result">Result transform</Label> */}
            <CodeEditorModal value={data.transformResult} onChange={v => {
                data.transformResult = v
                onChange(variable => {
                    variable.value = JSON.stringify(data)
                })
            }} />
        </InputGroup>
    </>)
}

export default HttpVariableEditor



const initTransformRequest =
`function transformRequest(url,headers,startTime, endTime) {
    let newUrl = url + \`&start=$\{startTime}&end=$\{endTime}\`
    console.log("here333 transform request :", url, newUrl, headers, startTime, endTime)
    return newUrl
}`

const initTransformResult =
`function transformResult(httpResult) {
    console.log("here333 transformResult:", httpResult)
    returen httpResult.data    
}`
