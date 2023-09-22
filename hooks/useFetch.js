import { useState } from "react";

export default function useFetch({ url, params }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
}
