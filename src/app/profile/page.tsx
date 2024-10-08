import { NextPage } from "next";
import React from "react";
import Image from "next/image";
import { getUserProfileData } from "@/services/profile.service";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Profile: NextPage = withPageAuthRequired(
  async () => {
    const user = await getUserProfileData();
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900">
        <h1 className="text-3xl font-bold dark:text-white mb-8">
          Profile Page
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={user.picture}
                alt="Profile"
                className="h-48 w-full object-cover md:w-48"
                width={192}
                height={192}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">
                {user.email}
              </div>
              <h2 className="mt-2 text-2xl leading-8 font-semibold text-gray-900 dark:text-gray-100">
                {user.name}
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Welcome to your profile page. Here you can view and manage your
                account details.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  },
  { returnTo: "/profile" }
);

export default Profile;
