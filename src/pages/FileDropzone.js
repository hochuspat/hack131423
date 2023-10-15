import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Text,
  CircularProgress,
  Flex,
  VStack,
  Icon,
  useToast,
  Button,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const mockServerErrorResponses = [
  {
    status: 400,
    error_message: 'Найден недопустимый символ',
    recommendation: 'В номере документа можно использовать только цифры',
  },
];

const FileDropzone = () => {
  const [files, setFiles] = useState([]);
  const toast = useToast();
  const [pdfSrc, setPdfSrc] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const showErrorToast = useCallback((status, errorMessage, recommendation) => {
    toast({
      title: errorMessage,
      description: recommendation,
      status: 'error', 
      duration: 5000,
      isClosable: true,
      position: 'top-right', 
    });
}, [toast]);

  
const FileCard = ({ name, progress }) => {
  // ... код компонента FileCard
};

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        setFiles([{ name: file.name, progress: 0 }]);
        await uploadFile(file);
  
        const url = URL.createObjectURL(file);
        setPdfSrc(url);
      } catch (error) {
        setFiles([]);
        setPdfSrc(null);
      }
      // После загрузки файла (или попытки загрузки), вызываем showErrorToast
      const errorDetails = mockServerErrorResponses[0]; 
      showErrorToast(errorDetails.status, errorDetails.error_message, errorDetails.recommendation);
    }
  }, [showErrorToast]);
  


  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.2; 
        if (success) {
          resolve();
        } else {
          // Генерируем ошибку с сообщением из mockServerErrorResponses
          const mockError = mockServerErrorResponses[0];
          reject(new Error(JSON.stringify(mockError)));
        }
      }, 2000);
    });
  };

  const resetUpload = () => {
    setFiles([]);
    setPdfSrc(null);
    setUploadError(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (pdfSrc) {
        URL.revokeObjectURL(pdfSrc);
      }
    };
  }, [pdfSrc]);

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" px="4">
      {uploadError ? (
        <VStack align="center" spacing={4} w="full">
          <Text fontSize="xl" fontWeight="semibold" mb="2">
            Возникла ошибка при загрузке файла
          </Text>
          <Text fontSize="md" color="gray.500">
            {uploadError}
          </Text>
          <Button onClick={resetUpload}>Повторить попытку</Button>
        </VStack>
      ) : files.length > 0 ? (
        <Flex alignItems="center" justifyContent="center" w="100%" h="600px" position="relative">
          <iframe src={pdfSrc} width="100%" height="600px" style={{ zIndex: 1 }} />
        </Flex>
      ) : (
        <Box position="relative" w="full" maxW="600px" border="2px dashed gray" borderRadius="12px" mt="4" p="4" bg="white">
          <VStack {...getRootProps()} align="center" justify="center" spacing={4} w="full">
            <Text fontSize="xl" fontWeight="semibold" mb="2">
              Перетащите документ PDF сюда
            </Text>
            <Text fontSize="md" color="gray.500">
              или кликните для выбора
            </Text>
            <Flex wrap="wrap" justify="center" w="full">
              {files.map((file) => (
                <FileCard key={file.name} name={file.name} progress={file.progress} />
              ))}
            </Flex>
            <input {...getInputProps()} />
          </VStack>
        </Box>
      )}
    </Flex>
  );
};

export default FileDropzone;
