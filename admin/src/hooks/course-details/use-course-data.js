import { useEffect, useState } from 'react';

export function useCourseData(data) {
  const [course, setCourse] = useState({});
  const [modules, setModules] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [lessonContents, setLessonContents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    if (!data?.data) return;
    const {
      course,
      objectives,
      modules,
      chapters,
      lessons,
      lessonContents,
      quizzes,
      options,
    } = data.data;
    setCourse(course);
    setObjectives(objectives);
    setModules(modules);
    setChapters(chapters);
    setLessons(lessons);
    setLessonContents(lessonContents);
    setQuizzes(quizzes);
    setQuizOptions(options);
  }, [data?.data]);

  return {
    course,
    objectives,
    setObjectives,
    modules,
    setModules,
    chapters,
    setChapters,
    lessons,
    setLessons,
    lessonContents,
    setLessonContents,
    quizzes,
    setQuizzes,
    quizOptions,
    setQuizOptions,
  };
}
