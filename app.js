"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, MessageSquare, FileText, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DialogsDemo() {
  const [promptResult, setPromptResult] = useState<string | null>(null)
  const [alertShown, setAlertShown] = useState(false)
  const [documentWriteContent, setDocumentWriteContent] = useState("")
  const [iframeKey, setIframeKey] = useState(0)
  const [activeTab, setActiveTab] = useState("prompt")
  const [isLoading, setIsLoading] = useState(false)

  // Animation for button click
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  }

  // Animation for results
  const resultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  }

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      },
    },
  }

  // Simulate loading for document.write examples
  const simulateLoading = (callback: () => void) => {
    setIsLoading(true)
    setTimeout(() => {
      callback()
      setIsLoading(false)
    }, 600)
  }

  // Basic prompt example
  const showBasicPrompt = () => {
    const result = prompt("Please enter your name:")
    setPromptResult(result)
  }

  // Prompt with default value
  const showPromptWithDefault = () => {
    const result = prompt("What is your favorite color?", "Blue")
    setPromptResult(result)
  }

  // Prompt with validation
  const showPromptWithValidation = () => {
    let age
    do {
      age = prompt("Please enter your age (must be a number):")
      if (age === null) return setPromptResult("Cancelled") // User clicked Cancel
    } while (age !== null && isNaN(Number(age)))

    setPromptResult(age)
  }

  // Basic alert example
  const showBasicAlert = () => {
    alert("This is a basic alert message!")
    setAlertShown(true)
  }

  // Alert with formatted text
  const showFormattedAlert = () => {
    alert("Welcome to JavaScript Dialogs Demo!\n\nThis alert shows how to display multiple lines of text.")
    setAlertShown(true)
  }

  // Alert with dynamic content
  const showDynamicAlert = () => {
    const now = new Date()
    alert(`Current time: ${now.toLocaleTimeString()}`)
    setAlertShown(true)
  }

  // Basic document.write example
  const showBasicDocumentWrite = () => {
    simulateLoading(() => {
      const content = "<h1>Hello World!</h1><p>This content was written using document.write()</p>"
      setDocumentWriteContent(content)
      setIframeKey((prev) => prev + 1)
    })
  }

  // Document write with styling
  const showStyledDocumentWrite = () => {
    simulateLoading(() => {
      const content = `
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #0070f3; }
          .container { 
            border: 1px solid #ddd; 
            padding: 15px; 
            border-radius: 5px; 
            animation: fadeIn 0.5s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
        <div class="container">
          <h1>Styled Content</h1>
          <p>This content includes CSS styling and animations applied with document.write()</p>
        </div>
      `
      setDocumentWriteContent(content)
      setIframeKey((prev) => prev + 1)
    })
  }

  // Document write with dynamic content
  const showDynamicDocumentWrite = () => {
    simulateLoading(() => {
      const now = new Date()
      const content = `
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .time { 
            font-size: 2rem; 
            font-weight: bold; 
            color: #0070f3; 
            animation: pulse 2s infinite;
          }
          .date { 
            color: #666; 
            animation: slideIn 0.5s ease-out;
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
        <h1>Current Date & Time</h1>
        <p class="time">${now.toLocaleTimeString()}</p>
        <p class="date">${now.toLocaleDateString()}</p>
        <p>This content was dynamically generated with animations.</p>
      `
      setDocumentWriteContent(content)
      setIframeKey((prev) => prev + 1)
    })
  }

  // Create a practical example that combines all three methods
  const runPracticalExample = () => {
    const name = prompt("What's your name?", "Guest")
    if (name) {
      const birthYear = prompt(`Hi ${name}, what year were you born?`)
      if (birthYear && !isNaN(Number(birthYear))) {
        const currentYear = new Date().getFullYear()
        const age = currentYear - Number(birthYear)
        alert(`Hello ${name}! You are approximately ${age} years old.`)

        simulateLoading(() => {
          const content = `
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
              .card { 
                background: white; 
                border-radius: 8px; 
                padding: 20px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                animation: fadeInUp 0.8s ease-out;
              }
              .name { 
                color: #0070f3; 
                font-size: 24px; 
                font-weight: bold;
                animation: shimmer 2s infinite;
                background: linear-gradient(90deg, #0070f3, #66a6ff, #0070f3);
                background-size: 200% auto;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .age { 
                font-size: 18px; 
                margin-top: 10px;
                animation: slideIn 0.5s ease-out 0.3s both;
              }
              .info {
                animation: slideIn 0.5s ease-out 0.5s both;
              }
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes slideIn {
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
              }
              @keyframes shimmer {
                to { background-position: 200% center; }
              }
            </style>
            <div class="card">
              <h1>User Profile</h1>
              <p class="name">${name}</p>
              <p class="age">Age: ${age} years old</p>
              <p class="info">Birth Year: ${birthYear}</p>
              <p class="info">Generated on: ${new Date().toLocaleString()}</p>
            </div>
          `
          setDocumentWriteContent(content)
          setIframeKey((prev) => prev + 1)
        })
      } else {
        alert("Invalid birth year entered.")
      }
    }
  }

  return (
    <motion.div
      className="container mx-auto p-4 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        JavaScript Dialogs Demo
        <motion.span
          className="inline-block ml-2"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </motion.span>
      </motion.h1>

      <Tabs defaultValue="prompt" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="prompt" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Prompt
          </TabsTrigger>
          <TabsTrigger value="alert" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Alert
          </TabsTrigger>
          <TabsTrigger value="document-write" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            document.write()
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="prompt">
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card>
                  <CardHeader>
                    <CardTitle>JavaScript Prompt Examples</CardTitle>
                    <CardDescription>
                      The prompt() method displays a dialog box that prompts the user for input.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showBasicPrompt} className="w-full">
                          Basic Prompt
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showPromptWithDefault} className="w-full">
                          Prompt with Default
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showPromptWithValidation} className="w-full">
                          Prompt with Validation
                        </Button>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {promptResult !== null && (
                        <motion.div
                          className="mt-4 p-4 border rounded-md bg-gray-50"
                          variants={resultVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <p className="font-semibold">Result:</p>
                          <p className="mt-1">{promptResult === "" ? "(empty string)" : promptResult}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="alert">
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card>
                  <CardHeader>
                    <CardTitle>JavaScript Alert Examples</CardTitle>
                    <CardDescription>
                      The alert() method displays an alert box with a message and an OK button.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showBasicAlert} className="w-full">
                          Basic Alert
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showFormattedAlert} className="w-full">
                          Formatted Alert
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showDynamicAlert} className="w-full">
                          Dynamic Alert
                        </Button>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {alertShown && (
                        <motion.div
                          className="mt-4 p-4 border rounded-md bg-gray-50"
                          variants={resultVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <p>An alert was displayed. Check it out by clicking one of the buttons above again.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="document-write">
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card>
                  <CardHeader>
                    <CardTitle>document.write() Examples</CardTitle>
                    <CardDescription>
                      The document.write() method writes HTML expressions or JavaScript code to a document.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showBasicDocumentWrite} className="w-full" disabled={isLoading}>
                          {isLoading ? "Loading..." : "Basic document.write()"}
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showStyledDocumentWrite} className="w-full" disabled={isLoading}>
                          {isLoading ? "Loading..." : "Styled Content"}
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={showDynamicDocumentWrite} className="w-full" disabled={isLoading}>
                          {isLoading ? "Loading..." : "Dynamic Content"}
                        </Button>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {documentWriteContent && (
                        <motion.div
                          className="mt-4 border rounded-md overflow-hidden bg-white h-[300px]"
                          variants={resultVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                          ) : (
                            <iframe
                              key={iframeKey}
                              className="w-full h-full border-0"
                              srcDoc={`<!DOCTYPE html><html><body>${documentWriteContent}</body></html>`}
                              title="document.write output"
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.3,
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Practical Example</CardTitle>
            <CardDescription>
              This example combines prompt(), alert(), and document.write() in a practical scenario.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-full">
              <Button
                onClick={runPracticalExample}
                className="w-full relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10">{isLoading ? "Loading..." : "Run Practical Example"}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
