const techs = [
 
  { name: "Java", file: "java-original.svg" },
  { name: "Spring", file: "spring-original.svg" },
  { name: "C#", file: "csharp-original.svg" },
  { name: ".NET", file: "dotnetcore-original.svg" },
  { name: "Angular", file: "angularjs-original.svg" },
  { name: "NodeJS", file: "nodejs-original.svg" },
  { name: "ReactJS", file: "react-original.svg" },
  { name: "PHP", file: "php-original.svg" },
  { name: "Kotlin", file: "kotlin-original.svg" },
  { name: "Python", file: "python-original.svg" },
  { name: "C++", file: "cplusplus-original.svg" },
  { name: "C", file: "c-original.svg" },

  { name: "JavaScript", file: "javascript-original.svg" },
  { name: "TypeScript", file: "typescript-original.svg" },
  { name: "HTML", file: "html5-original.svg" },
  { name: "CSS", file: "css3-original.svg" },
  { name: "Tailwind", file: "tailwindcss-original.svg" },

  //  DATABASE
  { name: "MySQL", file: "mysql-original.svg" },
  { name: "PostgreSQL", file: "postgresql-original.svg" },
  { name: "Oracle", file: "oracle-original.svg" },

  // TESTS
  { name: "JUnit", file: "junit-original.svg" },
  { name: "PyTest", file: "pytest-original.svg" },
  { name: "Postman", file: "postman-original.svg" },
  { name: "Jenkins", file: "jenkins-original.svg" },

  // DEVOPS / CLOUD
  { name: "Docker", file: "docker-original.svg" },
  { name: "Kubernetes", file: "kubernetes-original.svg" },
  { name: "AWS", file: "amazonwebservices-original-wordmark.svg" },
  { name: "Google Cloud", file: "googlecloud-original.svg" },

  // TOOLS
  { name: "Git", file: "git-original.svg" },
  { name: "GitHub", file: "github-original.svg" },


];

const TechStack = () => {
  return (
    <section id="stack" className="bg-gradient-to-b from-white to-gray-100 py-20 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Tech Stack</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">
        {techs.map((tech, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <img
              src={`/assets/${tech.file}`}
              alt={tech.name}
              className="w-14 h-14 object-contain mb-4"
            />
            <p className="text-gray-800 font-medium text-sm">{tech.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default TechStack;
