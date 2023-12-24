import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ImgModal } from './Modal/Modal';
import getImages from 'service/api';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getPhotos = async () => {
      if (!query) return;
      setIsLoading(true);

      try {
        const { hits, totalHits } = await getImages(query, page);
        if (hits.length === 0) {
          setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsVisible(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError('❌ Oops something went wrong 😭');
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [query, page]);

  const handleSearchSubmit = searchQuery => {
    setQuery(searchQuery);
    resetPage();
    setImages([]);
    setError(null);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (largeImg, tags) => {
    setShowModal(true);
    setLargeImg(largeImg);
    setTags(tags);
  };

  const handleImageClose = () => {
    setShowModal(false);
    setLargeImg('');
    setTags('');
  };

  const resetPage = () => {
    setPage(1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {isEmpty && <h2>Sorry. There are no images ... 😭</h2>}
      {error && <h2>{error}</h2>}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      <ImgModal
        modalIsOpen={showModal}
        closeModal={handleImageClose}
        largeImg={largeImg}
        tags={tags}
      />
      {isLoading && <Loader />}
      {isVisible && !isLoading && images.length > 0 && (
        <div className="BtnCenter">
          <Button onClick={handleLoadMore} disabled={isLoading} />
        </div>
      )}
    </div>
  );
};

export default App;
