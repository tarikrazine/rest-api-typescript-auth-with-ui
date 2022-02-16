import axios from 'axios';

const fetcher = async <T>(url: string, headers: {}): Promise<T | null> => {
  try {
    const { data } = await axios.get<T>(url, {
      headers,
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    return error;
  }
};

export default fetcher;