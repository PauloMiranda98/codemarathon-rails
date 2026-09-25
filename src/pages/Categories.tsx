import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Category } from '../types/contents';
import { SubjectCard } from '../components/SubjectCard';

export const Categories: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;

    fetch(`${baseUrl}contents/index.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Não foi possível carregar os conteúdos');
        return res.json();
      })
      .then((data: Category[]) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const activeCategorySlug = categoryId || (categories.length > 0 ? categories[0].slug : 'introducao');

  // Redirect to first category if visiting /conteudos directly
  useEffect(() => {
    if (!categoryId && categories.length > 0) {
      navigate(`/conteudos/${categories[0].slug}`, { replace: true });
    }
  }, [categoryId, categories, navigate]);

  const activeCategory = categories.find((cat) => cat.slug === activeCategorySlug);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
        <div className="text-gray-500 font-medium">Carregando conteúdos...</div>
      </div>
    );
  }

  if (error || !categories.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
        <div className="text-red-600 font-medium">{error || 'Nenhum conteúdo encontrado.'}</div>
      </div>
    );
  }

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col relative overflow-hidden lg:py-12">
      <div className="relative w-full px-5 py-5 bg-white shadow-sm shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-5xl rounded-lg">
        {/* Category Tabs */}
        <div className="w-full bg-white">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {categories.map((category) => {
              const isActive = category.slug === activeCategorySlug;
              return (
                <li key={category.slug} className="mr-2 mb-1">
                  <Link
                    to={`/conteudos/${category.slug}`}
                    className={
                      isActive
                        ? 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active font-semibold dark:bg-gray-800 dark:text-blue-500'
                        : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors'
                    }
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Subjects Grid */}
        {activeCategory ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6 bg-white rounded-lg">
            {activeCategory.subjects.map((subject) => {
              const imageSrc = `${baseUrl}${activeCategory.image}`;
              return (
                <SubjectCard
                  key={subject.slug}
                  title={subject.name}
                  imageUrl={imageSrc}
                  obiFrequency={subject.obi_frequency}
                  icpcFrequency={subject.icpc_frequency}
                  linkUrl={`/conteudos/${activeCategory.slug}/${subject.slug}`}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            Categoria não encontrada.
          </div>
        )}
      </div>
    </div>
  );
};
