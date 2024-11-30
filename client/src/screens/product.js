import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Loader from './loader';
import ReviewCard from './review_card';

const Product = () => {
    const [productInfo, setProductInfo] = useState({})
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [filterDisplay, setFilterDisplay] = useState(false);
    const [collectionsDisplay, setCollectionsDisplay] = useState(false)
    const [addReviewDisplay, setAddReviewDisplay] = useState(false)
    const [newReview, setNewReview] = useState({username: "test-acc", rating: "", review: ""});
    const [reviews, setReviews] = useState([]);
    
    const { productID } = useParams()

    const filterPopup = () => {
        setFilterDisplay(!filterDisplay)
    }

    const collectionsPopup = () => {
        setCollectionsDisplay(!collectionsDisplay)
    }

    const addReviewPopup = () => {
        setAddReviewDisplay(!addReviewDisplay)
    }

    const handleReviewChange = (e) => {
        setNewReview({...newReview, [e.target.name]: e.target.value})
    };

    const handleNewComment = () => {
        loadReviews()
    }

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/reviews?productID=${productID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview)
            });
    
            if (response.ok) {
                console.log('review uploaded successfully');
                setNewReview({ username: 'test-acc', rating: '', review: ''}); // Reset form
                setAddReviewDisplay(false);
                loadReviews();
            } else {
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    const loadProductInfo = async () => {
        //const apiUrl = process.env.REACT_APP_API_URL; // Use the API URL from environment variables
        //const apiUrl = 'http://localhost:3001'
        setIsDataLoading(true);
        await fetch(`/api/v1/posts?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProductInfo(data);
                setIsDataLoading(false);
            })
            .catch((error) => console.error('Error loading product info:', error));

    }  

    const loadReviews =  async () => {
        setIsDataLoading(true);
        await fetch(`/api/v1/reviews?productID=${productID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setReviews(data);
                setIsDataLoading(false);
            })
            .catch((error) => console.error('Error loading reviews:', error))
    }

    useEffect(() => {
        loadProductInfo()
    }, []);

    useEffect(() => {
        loadReviews()
    }, []);

    /* const loadReviews = () => {
        try {
            let reviews = await fetchJSON(`api/v1/reviews?productID=${}`)
        }
    } */
        
    /* 
    
    will need to fetch:
    comments data
    whether user has liked a review
    user's collections

    On load:

    - Using review data (an array of review objects),
    use mapping to parse review data. if array is empty, do not parse
    and use empty tags.

    - Reviews will also be parsed for if a user has liked a review
    (meaning they are in the likes array)

    Otherwise:

    - Collections will be fetched only if user clicks add to collection, should be cached after
    Parse collections for whether item has already been added and show which collections already have the item.
    
    - Comments will be fetched only if user clicks toggle on replies, should
    only be rendered once and then basically cached.

    POSTs:

    - Add product to collection: user must pick either a default collection (wishlist) or another collection
    - Write a review: select existing tags, dropdown rating, review text

     */



    /* determined by user so implement persistence later */
    return (
        <div>
            {isDataLoading ? <Loader /> : 
            <>
            <div className="product-container">

            <div className="product-col product-img">
                    <img src={productInfo.url} alt="product"></img>
            </div>

            <div className="product-col product-info">

                <div className="product-head">
                    <h2>{productInfo.name}</h2>
                    <p>{productInfo.category}</p>
                    <p>{productInfo.price}</p>
                </div>

                <hr/>

                <div className="product-tags">
                    <span>Normal Skin</span>
                    <span>Ceramides</span>
                    <span>Moisturizing</span>
                </div>

                <hr />

                <div className="product-descr">
                    <h3>DESCRIPTION</h3>
                    <p>This is the product description. Might look something like: CeraVe Moisturizing Cream is a rich, non-greasy, fast-absorbing moisturizer with three essential ceramides that lock in skin's moisture and help maintain the skin's protective barrier. Word Count Limit?</p>
                </div>

                <button onClick={collectionsPopup} id="add-to-collection">Add to Collection <span className="fa fa-angle-down down-arrow"></span></button>
                {collectionsDisplay ? 
                <>
                <div className="filter-overlay"></div>
                <div className="collections-popup">
                    <div className="popup-head">
                        <h4>Add to collection</h4>
                        <button onClick={collectionsPopup}><span className="fa fa-minus"></span></button>
                    </div>
                        <div className="collection">
                            <img src="https://i.pinimg.com/236x/97/69/da/9769da3ec35c566c9aeb4356afab1010.jpg"></img>
                            <p>Wishlist</p>
                        </div>
                        <div className="collection">
                            <img src="https://i.pinimg.com/236x/97/69/da/9769da3ec35c566c9aeb4356afab1010.jpg"></img>
                            <p>Daily Routine</p>
                        </div>
                        <div className="collection">
                            <img src="https://i.pinimg.com/236x/97/69/da/9769da3ec35c566c9aeb4356afab1010.jpg"></img>
                            <p>Favorites</p>
                        </div>
                </div> 
                </>
                : 
                <></>

                }
                <hr />

                {addReviewDisplay ? 
                <>
                <div className="filter-overlay"></div>
                <div className="add-review-popup">
                    <div className="popup-head">
                        <h4>Write a review</h4>
                        <button onClick={addReviewPopup}><span className="fa fa-minus"></span></button>
                    </div>
                    <form id="add-review" onSubmit={submitReview}>
                        <p>Rating</p>
                        <select className="form-select" name="rating" value={newReview.rating} onChange={handleReviewChange} aria-label='Choose rating'>
                            <option selected></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <p>What did you think about this product?</p>
                        <textarea rows={4} name="review" value={newReview.review} onChange={handleReviewChange}/>
                        <button type="submit">Submit</button>
                    </form>
                </div> 
                </>
                : 
                <></>

                }
            </div>
            
        </div>
        <div id="product-reviews">
            <div className="product-reviews-head">
                <h3>REVIEWS ({reviews.length})</h3>
                <button onClick={addReviewPopup} id="add-review-button">Write a Review</button>
                <button onClick={filterPopup} id="sort-reviews">Sort</button>
                {filterDisplay ? 
                <>
                <div className="filter-overlay"></div>
                <div className="filter-popup">
                    <div className="popup-head">
                        <h4>Sort by</h4>
                        <button onClick={filterPopup}><span className="fa fa-minus"></span></button>
                    </div>
                        
                        <p>Most Recent</p>
                        <p>Highest Rated</p>
                        <p>Lowest Rated</p>
                        <p>Most Helpful</p>
                </div> 
                </>
                : 
                <></>

                }
            </div>
            {/* reviews should be handled in a separate component */}
            <div id='reviews'>
                {isDataLoading ? <Loader /> : reviews.map((review) => <ReviewCard key={review._id} review={review} callback={handleNewComment}/>)}     
            </div>
        </div>
    </>
            }
              </div>
    );
};

export default Product;