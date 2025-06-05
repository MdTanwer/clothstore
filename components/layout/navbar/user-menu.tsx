"use client";

import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  CogIcon,
  EyeIcon,
  EyeSlashIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setActiveTab("login");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setRememberMe(false);
    setAgreeToTerms(false);
    setLoginData({ email: "", password: "" });
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", loginData, "Remember me:", rememberMe);
    setIsLoggedIn(true);
    closeModal();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions!");
      return;
    }
    console.log("Registration data:", registerData);
    setIsLoggedIn(true);
    closeModal();
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center">
      {/* User Menu Button */}
      <button
        onClick={openModal}
        className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label="User menu"
      >
        <UserIcon className="h-6 w-6" />
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {isLoggedIn ? "My Account" : "Welcome"}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-md bg-white dark:bg-gray-900 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {!isLoggedIn ? (
                    <div className="space-y-6">
                      {/* Tab Headers */}
                      <div className="flex mb-6">
                        <div className="flex-1">
                          <button
                            onClick={() => setActiveTab("login")}
                            className={`w-full border-b-2 pb-2 transition-colors ${
                              activeTab === "login"
                                ? "border-black dark:border-white"
                                : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            <span
                              className={`text-lg font-medium ${
                                activeTab === "login"
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                              }`}
                            >
                              LOGIN
                            </span>
                          </button>
                        </div>
                        <div className="flex-1 ml-4">
                          <button
                            onClick={() => setActiveTab("register")}
                            className={`w-full border-b-2 pb-2 transition-colors ${
                              activeTab === "register"
                                ? "border-black dark:border-white"
                                : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            <span
                              className={`text-lg font-medium ${
                                activeTab === "register"
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                              }`}
                            >
                              SIGN UP
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Login Form */}
                      {activeTab === "login" && (
                        <form
                          className="space-y-4"
                          onSubmit={handleLoginSubmit}
                        >
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                              Username or Email Address
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={loginData.email}
                              onChange={handleLoginInputChange}
                              className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Enter your email address"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                              Password
                            </label>
                            <div className="relative">
                              <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={loginData.password}
                                onChange={handleLoginInputChange}
                                className="appearance-none block w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Enter your password"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                ) : (
                                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                  setRememberMe(e.target.checked)
                                }
                                className="h-4 w-4 text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                              />
                              <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                              >
                                Remember Me
                              </label>
                            </div>
                            <div className="text-sm">
                              <Link
                                href="/forgot-password"
                                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                onClick={closeModal}
                              >
                                Forgot Password?
                              </Link>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:focus:ring-white transition-colors"
                          >
                            Log In
                          </button>
                        </form>
                      )}

                      {/* Register Form */}
                      {activeTab === "register" && (
                        <form
                          className="space-y-4"
                          onSubmit={handleRegisterSubmit}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                              >
                                First Name
                              </label>
                              <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={registerData.firstName}
                                onChange={handleRegisterInputChange}
                                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="First name"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                              >
                                Last Name
                              </label>
                              <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                required
                                value={registerData.lastName}
                                onChange={handleRegisterInputChange}
                                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Last name"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="register-email"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                              Email Address
                            </label>
                            <input
                              id="register-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={registerData.email}
                              onChange={handleRegisterInputChange}
                              className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Enter your email address"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="register-password"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                              Password
                            </label>
                            <div className="relative">
                              <input
                                id="register-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={registerData.password}
                                onChange={handleRegisterInputChange}
                                className="appearance-none block w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Create a password"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                ) : (
                                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                              Confirm Password
                            </label>
                            <div className="relative">
                              <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                value={registerData.confirmPassword}
                                onChange={handleRegisterInputChange}
                                className="appearance-none block w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Confirm your password"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                ) : (
                                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <input
                              id="agree-terms"
                              name="agree-terms"
                              type="checkbox"
                              checked={agreeToTerms}
                              onChange={(e) =>
                                setAgreeToTerms(e.target.checked)
                              }
                              className="h-4 w-4 text-black dark:text-white focus:ring-black dark:focus:ring-white border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 mt-1"
                            />
                            <label
                              htmlFor="agree-terms"
                              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                              I agree to the{" "}
                              <Link
                                href="/terms"
                                className="text-black dark:text-white hover:underline"
                                onClick={closeModal}
                              >
                                Terms and Conditions
                              </Link>{" "}
                              and{" "}
                              <Link
                                href="/privacy"
                                className="text-black dark:text-white hover:underline"
                                onClick={closeModal}
                              >
                                Privacy Policy
                              </Link>
                            </label>
                          </div>

                          <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:focus:ring-white transition-colors"
                          >
                            Create Account
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    // Logged In Content
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                          <UserIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Welcome back!
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            user@example.com
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link
                          href="/account"
                          onClick={closeModal}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          <UserIcon className="h-5 w-5 mr-3" />
                          My Account
                        </Link>

                        <Link
                          href="/account/orders"
                          onClick={closeModal}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          <ShoppingBagIcon className="h-5 w-5 mr-3" />
                          Order History
                        </Link>

                        <Link
                          href="/account/settings"
                          onClick={closeModal}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          <CogIcon className="h-5 w-5 mr-3" />
                          Settings
                        </Link>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            closeModal();
                          }}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
