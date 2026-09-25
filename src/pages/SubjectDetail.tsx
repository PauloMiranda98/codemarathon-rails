import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Category, Subject } from '../types/contents';
import { Breadcrumb } from '../components/Breadcrumb';
import { MarkdownWithLatex } from '../components/MarkdownWithLatex';

export const SubjectDetail: React.FC = () => {
  const { categoryId, subjectId } = useParams<{ categoryId: string; subjectId: string }>();

  const [category, setCategory] = useState<Category | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId || !subjectId) return;

    setLoading(true);
    setError(null);

    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    // Fetch categories index to find names
    fetch(`${baseUrl}contents/index.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar metadados do conteúdo.');
        return res.json();
      })
      .then((categories: Category[]) => {
        const foundCategory = categories.find((c) => c.slug === categoryId);
        if (!foundCategory) throw new Error('Categoria não encontrada.');

        const foundSubject = foundCategory.subjects.find((s) => s.slug === subjectId);
        if (!foundSubject) throw new Error('Assunto não encontrado.');

        setCategory(foundCategory);
        setSubject(foundSubject);

        // Fetch markdown content
        return fetch(`${baseUrl}contents/${categoryId}/${subjectId}.md`);
      })
      .then((res) => {
        if (!res.ok) throw new Error('Conteúdo não foi escrito ainda.');
        return res.text();
      })
      .then((text) => {
        setMarkdownText(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [categoryId, subjectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
        <div className="text-gray-500 font-medium">Carregando conteúdo...</div>
      </div>
    );
  }

  if (error || !category || !subject) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center justify-center space-y-4">
        <div className="text-red-600 font-semibold text-lg">{error || 'Conteúdo não encontrado.'}</div>
        <Link
          to="/conteudos"
          className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg font-medium"
        >
          Voltar para os conteúdos
        </Link>
      </div>
    );
  }

  const githubEditUrl = `https://github.com/PauloMiranda98/codemarathon-rails/blob/main/contents/${categoryId}/${subjectId}.md`;

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col justify-start relative overflow-hidden lg:py-12">
      <div className="max-w-4xl mx-auto w-full px-4">
        <Breadcrumb
          items={[
            { title: 'Início', url: '/' },
            { title: category.name, url: `/conteudos/${category.slug}` },
            { title: subject.name },
          ]}
        />
        <div className="my-4"></div>
        <div className="relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl rounded-lg">
          <MarkdownWithLatex content={markdownText} />

          <div className="flex justify-center mt-12 pt-6 border-t border-gray-100">
            <a
              href={githubEditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 shadow-md transition-all"
            >
              Contribuir com esse conteúdo no GitHub
              <svg
                className="ml-2 -mr-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
