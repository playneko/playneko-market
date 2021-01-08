export default function Title() {
    const useTitle = (title) => {
      const htmlTitle = document.querySelector("title");
      htmlTitle.innerHTML = title;
    };

    return useTitle;
}
