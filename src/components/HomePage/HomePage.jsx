import { useEffect } from "react";

export const HomePage = () => {
  const getData = async () => {
    const productResponse = await fetch("/api/posts");
    console.log(await productResponse.json());
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>HomePage</div>;
};
