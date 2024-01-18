import React, { useEffect, useState } from "react";

export const JobsContainer = () => {
  const [isLoading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  getJobsJSON(setLoading, setJobs);

  return JobsDisplay(isLoading, jobs);
};

const getJobsJSON = async (setLoading, setJobs) => {
  useEffect(async () => {
    const response = await fetch(
      "https://tlmw-external.azurewebsites.net/api/JobPostingsTrigger?code=mQJYB4t8rc6p6Zr-Khjbk5srngBr_BVdgdDWdzIsMgJdAzFuuX4RDw==&format=json",
    );
    if (response.ok) {
      const json = await response.json();
      setJobs(json.jobs);
      setLoading(false);
    }
  }, []);
};

type Job = {
  link: string;
  name: string;
  location: string;
};

const JobsDisplay = (isLoading: boolean, jobJson: Job[]) => {
  return (
    <>
      {isLoading ? (
        <p className="text-wrapper-ad">Loading jobs ...</p>
      ) : (
        <>
          {jobJson.length == 0 ? (
            <p>We couldn't load the available jobs, please check back later.</p>
          ) : (
            <ul class="jobs__list">
              {jobJson.map((job) => (
                <li className="jobs__ad" key={job.link}>
                  <a className="jobs__job-link" href={job.link}>
                    <h3 className="jobs__job-header">{job.name}</h3>
                    <div className="jobs__job-subheader">
                      <svg
                        className="jobs__job-arrow"
                        viewBox="0 0 73 16"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path d="M0 8H72" />
                        <path
                          d="M65.75 1.75 72 8 65.75 14.25"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div>{job.location}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
