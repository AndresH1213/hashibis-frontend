import supportContent from '@/i18n/en/support.json';

const Support = () => {
  return (
    <div className="container mx-auto my-4 p-6 max-w-screen-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">
        {supportContent.header.title}
      </h1>
      <p className="mb-6">{supportContent.header.content}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {supportContent.introduction.title}
        </h2>
        <p className="mb-4">{supportContent.introduction.content.paragraph}</p>
        <ul className="list-disc list-inside pl-6">
          {supportContent.introduction.content.options.map((opt, i) => {
            return (
              <li id={i.toString()}>
                <span className="bold">{opt.subtitle}</span>
                {opt.description}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {supportContent.frequentQuestions.title}
        </h2>
        <ul className="list-none space-y-3 list-inside pl-6">
          {supportContent.frequentQuestions.questions.map((question, i) => {
            return (
              <li id={i.toString()}>
                <h2 className="font-semibold">{question.question}</h2>
                <p>{question.answer}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Support;
