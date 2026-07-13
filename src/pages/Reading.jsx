const CURRENTLY_READING = [
  {
    title: "Ikigai: The Japanese Secret to a Long and Happy Life",
    author: "Héctor García & Francesc Miralles",
    href: "https://www.amazon.ca/Ikigai-Japanese-Secret-Long-Happy/dp/0143130722",
  },
];

const FINISHED = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    href: "https://www.goodreads.com/book/show/40121378-atomic-habits",
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    href: "https://www.goodreads.com/book/show/28257707-the-subtle-art-of-not-giving-a-f-ck",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    href: "https://www.goodreads.com/book/show/4069.Man_s_Search_for_Meaning",
  },
];

function BookList({ books }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.title}>
          <a href={book.href} target="_blank" rel="noopener noreferrer">
            {book.title}
          </a>
          <span className="book-author"> ({book.author})</span>
        </li>
      ))}
    </ul>
  );
}

export default function Reading() {
  return (
    <>
      <h1>Reading</h1>

      <p>
        <strong>Currently reading:</strong>
      </p>
      <BookList books={CURRENTLY_READING} />

      <p>
        <strong>Finished:</strong>
      </p>
      <BookList books={FINISHED} />
    </>
  );
}
