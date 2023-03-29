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
        <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 grid-cols-2">
          <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
            {newsData.map((news, index) => (
              <a
                // key={index}
                href={news.newsLink}
                target="_blank"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                  <h5
                    // key={index}
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {news.newsTitle}
                  </h5>
                  <p class="my-4">{news.newsContent}</p>
                </blockquote>
                <figcaption class="flex items-center justify-center space-x-3">
                  <h5>{news.newsPress}</h5>
                  <h5>{news.newsDate}</h5>
                </figcaption>
              </a>
            ))}
          </figure>
        </div>
      ) : (
        <div>
          <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
            <div>
              {selectedWordNewsData.map((wordNews, index) => (
                <a
                  // key={index}
                  href={wordNews.newsLink}
                  target="_blank"
                  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h5
                      // key={index}
                      class="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      {wordNews.newsTitle}
                    </h5>
                    <p class="my-4">{wordNews.newsContent}</p>
                  </blockquote>
                  <figcaption class="flex items-center justify-center space-x-3">
                    <h5>{wordNews.newsPress}</h5>
                    <h5>{wordNews.newsDate}</h5>
                  </figcaption>
                </a>
              ))}
            </div>
          </figure>
        </div>
      )}
    </>
  );
}
export default News;
