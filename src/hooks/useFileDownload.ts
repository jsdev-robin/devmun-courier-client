import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';

interface UseFileDownloadOptions {
  url: string;
  method?: 'GET' | 'POST';
  fileName: string;
  fileType: string;
  data?: unknown;
  config?: AxiosRequestConfig;
}

export const useFileDownload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = useCallback(async (options: UseFileDownloadOptions) => {
    const { url, method = 'GET', fileName, fileType, data, config } = options;
    try {
      setIsLoading(true);

      await axios.post(
        'http://localhost:8080/api/v1/auth/refresh-token',
        {},
        { withCredentials: true },
      );

      const response = await axios({
        url,
        method,
        responseType: 'blob',
        data,
        withCredentials: true,
        ...config,
      });

      const blob = new Blob([response.data], { type: fileType });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { downloadFile, isLoading };
};
