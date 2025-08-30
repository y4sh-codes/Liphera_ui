import { useEffect, useRef } from "react";

export function useIntersectionObserver() {
  const elementsRef = useRef<Element[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in-section, .scale-in-section",
    );
    animatedElements.forEach((el) => {
      observer.observe(el);
      elementsRef.current.push(el);
    });

    return () => {
      elementsRef.current.forEach((el) => observer.unobserve(el));
      elementsRef.current = [];
    };
  }, []);

  return null;
}
