'use client';

import React from 'react';

export default function CertPage() {
  const data = [
    {
      org: 'GG Accademy',
      logo: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png',
      certs: [
        { name: 'GG CLoud', image: 'https://i.pinimg.com/736x/4a/1e/15/4a1e15c5b16cc95f284eaa297c6eb124.jpg' },
      ],
    }, 
    {
    org: 'Udemy',
    logo: '/images/cert/udemy/udemy.png',
    certs: [
      {
        name: 'AWS Certified Cloud Practitioner',
        image: 'https://tse4.mm.bing.net/th/id/OIP.ROLTgcQjuVXiyW9Y_w9IRAHaFu?pid=Api'
      },
      {
        name: 'Master Microservices with Spring Boot',
        image: 'https://www.scribd.com/document/589024573/AWS-Certified-Cloud-Practitioner-certificate'
      }
    ]
  },
  {
    org: 'Data Camp',
    logo: '/images/cert/datacamp/datacamp-logo.png',
    certs: [
      {
        name: 'Intermediate SQL Queries',
        image: 'https://tse4.mm.bing.net/th/id/OIP.O8H0VJz3C6bfis3x_tmEAgHaEP?pid=Api'
      }
    ]
  },
  {
    org: 'FreeCodeCamp',
    logo: '/images/cert/freecodecamp/freecodecamp-icon.png',
    certs: [
      {
        name: 'Data Analysis with Python',
        image: 'https://tse3.mm.bing.net/th?id=OIP.YV9zicLretk58vJdeA8qjgHaEK&pid=Api'
      }
    ]
  },
  {
    org: 'Great Learning',
    logo: '/images/cert/greatlearning/logo.png',
    certs: [
      {
        name: 'GitHub Tutorial for Beginners',
        image: 'https://tse3.mm.bing.net/th?id=OIP.a7vZLvBrmlehpkCpxE8JvwHaFO&pid=Api'
      }
    ]
  },
  {
    org: 'DataQuest',
    logo: '/images/cert/dataquest/dataquest.png',
    certs: [
      {
        name: 'SQL Fundamentals',
        image: 'https://www.dataquest.io/path/sql-skills/'
      }
    ]
  },
  {
    org: 'Simplilearn',
    logo: '/images/cert/simplilearn/logo.jpg',
    certs: [
      {
        name: 'Git Training',
        image: 'https://www.simplilearn.com/learn-git-basics-skillup'
      }
    ]
  },
  {
    org: 'SoloLearn',
    logo: '/images/cert/sololearn/logo.png',
    certs: [
      {
        name: 'C# Basics',
        image: 'https://eg.mostaql.com/portfolio/559457-sololearn-c-certificate'
      }
    ]
  },
  {
    org: 'Programming Hub',
    logo: '/images/cert/programminghub/logo.png',
    certs: [
      {
        name: 'C++',
        image: 'https://www.jkimengineer.com/Menu/CERTIFICATES.html'
      }
    ]
  },
  {
    org: 'Codelearn.io',
    logo: '/images/cert/codelearn/codelearn.png',
    certs: [
      {
        name: 'Computer Software',
        image: 'https://www.codelearn.io/'
      }
    ]
  }
  ];

  return (
    <div className="certifications px-5 py-10 text-[#333] max-w-[1100px] mx-auto">
      <h1 className="text-[32px] font-semibold mb-4 text-gray-900 dark:text-[#E5E7EB]">Certifications</h1>

      <div className="flex flex-col gap-10">
        {data.map(({ org, certs, logo }) => (
          <div className="p-5" key={org}>
            <div className="flex items-center gap-4 mb-5">
              <img
                src={logo}
                alt={`${org} logo`}
                className="w-[60px] h-[60px] object-contain rounded-lg shrink-0 zoom-img"
              />
              <div className="text-[20px] font-semibold text-[#34495e] h-[60px] flex items-center dark:text-[#E5E7EB]">{org}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {certs.map((cert, index) => (
                <div
                  className="flex flex-col items-center p-3 rounded-[10px] transition-transform duration-200 hover:scale-[1.03] dark:text-gray-200 bg-[#ffffff0]"
                  key={cert.name || `untitled-${index}`}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    // width={160}
                    height={100}
                    className="rounded-lg object-cover w-[100%] h-auto zoom-img transition-transform duration-300 hover:scale-[1.05]"
                  />
                  <div className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                    {cert.name || <em>Untitled</em>}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
