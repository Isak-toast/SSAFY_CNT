import React from "react";

// DUMMY_NEWSDATA

// const news = NewsList[0].map((news, index) => (
//   <div>
//     <li key={index}>{news.newsPress}</li>
//     <li key={index}>{news.newsDate}</li>
//     <li key={index}>{news.newsTitle}</li>
//     <li key={index}>{news.newsContent}</li>
//     <li key={index}>{news.newsLink}</li>
//   </div>
// ));

function News(props) {
  let newsData = props.newsData;
  // console.log(newsData);
  let selectedWord = props.selectedWord;
  let selectedWordNewsData = props.selectedWordNewsData;
  // console.log(selectedWordNewsData);

  return (
    // <div>1</div>
    <>
      {selectedWord === "" ? (
        // <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 grid-cols-2">

        <div className="grid items-center justify-center p-8 text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 border-r-4 border-black">
          {newsData.map((news, index) => (
            <a
              // key={index}
              href={news.newsLink}
              target="_blank"
              className="mb-10 block max-w-sm p-6 items-center justify-center bg-blue-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <blockquote className="  max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h5
                  // key={index}
                  className="text-lg font-semibold text-gray-900 dark:text-white max-h-20"
                >
                  {news.newsTitle}
                </h5>
                <p className="my-4 h-30 truncate">{news.newsContent}</p>
              </blockquote>

              <h5>{news.newsPress}</h5>
              <h5>{news.newsDate}</h5>
            </a>
          ))}
        </div>
      ) : (
        // </div>

        <div className="grid items-center justify-center p-8 text-center bg-white  rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 border-r-4 border-black">
          {selectedWordNewsData.map((wordNews, index) => (
            <a
              // key={index}
              href={wordNews.newsLink}
              target="_blank"
              className="mb-10 block max-w-sm p-6 bg-blue-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h5
                  // key={index}
                  class="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {wordNews.newsTitle}
                </h5>
                <p class="my-4 h-30 truncate">{wordNews.newsContent}</p>
              </blockquote>
              <figcaption class="flex items-center justify-center space-x-3">
                <h5>{wordNews.newsPress}</h5>
                <h5>{wordNews.newsDate}</h5>
              </figcaption>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
export default News;
