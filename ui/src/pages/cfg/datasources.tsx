import React from "react"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, VStack, Flex, Box, useToast, HStack, Image, Text, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Tag } from "@chakra-ui/react"
import { Form } from "components/form/Form"
import Page from "layouts/page/Page"
import { isEmpty } from "lodash"
import { useEffect, useRef, useState } from "react"
import { FaCog } from "react-icons/fa"
import { InitTestDataDatasourceId } from "src/data/constants"
import { cfgLinks } from "src/data/nav-links"
import ReserveUrls from "src/data/reserve-urls"
import DatasourceEditor from "src/views/datasource/Editor"
import { Datasource } from "types/datasource"
import { requestApi } from "utils/axios/request"
import { useNavigate } from "react-router-dom"
import { useStore } from "@nanostores/react"
import { cfgDatasourceMsg, commonMsg } from "src/i18n/locales/en"

const DatasourcesPage = () => {
    const t = useStore(commonMsg)
    const t1 = useStore(cfgDatasourceMsg)
    const toast = useToast()
    const navigate = useNavigate()
    const [datasources, setDatasources] = useState<Datasource[]>([])
    const [datasource, setDatasource] = useState<Datasource>(null)
    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const res = await requestApi.get("/datasource/all")
        setDatasources(res.data)
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const cancelRef = useRef()

    const onChange = () => {
        onEditClose()
        load()
    }

    const onEditClose = () => {
        setDatasource(null)
        onClose()
    }

    const closeAlert = () => {
        setDatasource(null)
        onAlertClose()
    }

    const deleteDatasource = async () => {
        await requestApi.delete(`/datasource/${datasource.id}`)
        toast({
            description: t1.deleteToast({name: datasource.name}),
            status: "success",
            duration: 3000,
            isClosable: true,
        })

        const dss = datasources.filter(ds => ds.id != datasource.id)
        setDatasources(dss)
        closeAlert()
    }

    return <>
        <Page title={t.configuration} subTitle={t1.manageDs} icon={<FaCog />} tabs={cfgLinks}>
            <Flex justifyContent="space-between">
                <Box></Box>
                <Button size="sm" onClick={() => navigate(ReserveUrls.New + '/datasource')}>{t1.newDs}</Button>
            </Flex>

            <VStack alignItems="left" spacing={3} mt="3">
                {
                    datasources.map(ds => <Flex key={ds.id} className={`${datasource?.id == ds.id ? "tag-bg" : ""} label-bg`} p="4" alignItems="center" justifyContent="space-between">
                        <HStack>
                            <Image width="50px" height="50px" src={`/plugins/datasource/${ds.type}.svg`} />
                            <Box>
                                <Text fontWeight="550">{ds.name}</Text>
                                <Text textStyle="annotation" mt="1">{ds.type}  {!isEmpty(ds.url) && ` · ` + ds.url } {ds.id == InitTestDataDatasourceId && <Tag size="sm" ml="1"> default</Tag>}</Text>
                            </Box>
                        </HStack>

                        <HStack spacing={1}>
                            <Button size="sm" variant="ghost" onClick={() => {
                                setDatasource(ds)
                                onOpen()
                            }}>{t.edit}</Button>
                            <Button size="sm" variant="ghost" colorScheme="orange" onClick={() => {
                                onAlertOpen()
                                setDatasource(ds)
                            }}>{t.delete}</Button>
                        </HStack>
                    </Flex>)
                }
            </VStack>

        </Page>
        <Modal isOpen={isOpen} onClose={onEditClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t1.editDs}- {datasource?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Form spacing={2} sx={{'.form-item-label': {
                        width: '50px'
                    }}}>
                    {datasource && <DatasourceEditor ds={datasource} onChange={onChange} />}
                    </Form>
                </ModalBody>
            </ModalContent>
        </Modal>

        <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={closeAlert}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {t1.deleteDs} {datasource?.name}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {t.deleteAlert}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={closeAlert}>
                            {t.cancel}
                        </Button>
                        <Button colorScheme='red' onClick={deleteDatasource} ml={3}>
                            {t.delete}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>
}


export default DatasourcesPage