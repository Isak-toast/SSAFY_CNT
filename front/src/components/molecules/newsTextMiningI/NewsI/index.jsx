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

function NewsI(props) {
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

        <div className="pl-5 grid items-center justify-center text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 border-r-4 border-black font-mun">
          {newsData.map((news, index) => (
            <a
              key={index}
              href={news.newsLink}
              target="_blank"
              className="pt-5 pl-3 pr-3 mb-5 block max-w-l items-center bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5>{news.newsPress}</h5>
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h5
                  // key={index}
                  className="text-xl font-semibold text-gray-900 dark:text-white max-h-20  mt-1  mb-1"
                >
                  {news.newsTitle}
                </h5>
                <h5>{news.newsDate.substring(0, 10)}</h5>
                <p className="h-30 truncate mt-2">{news.newsContent}</p>
              </blockquote>

            </a>
          ))}
        </div>
      ) : (
        // </div>

        <div className="pl-5 grid items-center justify-center text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 border-r-4 border-black font-mun">
          {selectedWordNewsData.map((wordNews, index) => (
            <a
              key={index}
              href={wordNews.newsLink}
              target="_blank"
              className="pt-5 pl-3 pr-3 mb-5 block max-w-l items-center bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5>{wordNews.newsPress}</h5>
              <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h5
                  // key={index}
                  class="text-xl font-semibold text-gray-900 dark:text-white max-h-20  mt-1  mb-1"
                >
                  {wordNews.newsTitle}
                </h5>
                <h5>{wordNews.newsDate}</h5>
                <p class="h-30 truncate mt-2">{wordNews.newsContent}</p>
              </blockquote>
              <figcaption class="flex items-center justify-center space-x-3">
              </figcaption>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
export default NewsI;
