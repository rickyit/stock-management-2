import { useState } from "react";

const useFetch = ({ url, params }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
};

export default useFetch;
