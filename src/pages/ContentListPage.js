import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchContent } from "../api/contentService";
import ContentCard from "../components/ContentCart";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 5;

const ContentListPage = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchContents = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await fetchContent(pageNumber, PAGE_SIZE);
      console.log(res.data);
      setContents(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      // Handle error or show notification
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line
  }, []);

  const handleSeeMore = (contentId) => {
    navigate(`/contents/${contentId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchContents(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Contents</h2>
      {loading && <div>Loading...</div>}
      <div className="row">
        {contents.map((content) => (
          <div key={content.id} className="col-md-4 mb-3">
            <ContentCard content={content} onSeeMore={handleSeeMore} />
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ContentListPage;
