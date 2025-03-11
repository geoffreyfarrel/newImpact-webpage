import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Image from "next/image";

const About = () => {
  return (
    <section>
      <Card className="m-4 dark:bg-primary-800">
        <CardHeader className="mx-4">Project Overview</CardHeader>
        <Divider />
        <CardBody className="mb-4 flex flex-col justify-center lg:flex-row">
          <div className="flex w-full flex-col items-center">
            <h2 className="m-4 text-center text-2xl font-bold">
              Integrated Monitoring, Analysis, and Prediction of Environmental
              Sustainability: A Case Study of National Taipei University
            </h2>
            <Image
              className="m-4"
              src="/img/project.jpg"
              alt="Project image"
              width={450}
              height={450}
            />
          </div>
          <div className="flex w-full justify-center">
            <h2 className="m-4 text-justify text-xl font-semibold text-black/60 dark:text-white/70">
              This project aims to establish an integrated monitoring platform
              at the Mind Lake of National Taipei University to tackle pressing
              environmental sustainability challenges, including air pollution,
              water contamination, and flooding. By utilizing a LoRa-IoT
              (Internet of Things) system, the platform will monitor air
              quality, water quality, and water levels. It will also incorporate
              advanced deep learning techniques to develop predictive models
              that enhance the forecasting of environmental conditions.
              Additionally, an early warning system will be implemented to alert
              the community about potential risks related to air and water
              quality, as well as water levels. The initiative aspires to create
              a transparent and user-friendly dashboard that provides real-time
              information, thereby increasing public awareness and response
              capabilities to environmental changes. Ultimately, this project
              seeks to promote sustainable development and reduce risks to life
              safety and property.
            </h2>
          </div>
        </CardBody>
      </Card>
      <div className="flex flex-col items-center lg:flex-row">
        <Card className="m-4 w-full dark:bg-primary-800">
          <CardHeader className="mx-4">Lead Institution</CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold">
                National Taipei University
              </h3>
              <Image
                src="/img/ntpu-logo.png"
                alt="NTPU Logo"
                width={3000}
                height={3000}
              />
            </div>
          </CardBody>
        </Card>
        <Card className="m-4 w-full dark:bg-primary-800">
          <CardHeader className="mx-4">Project Sponsor</CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold">Honhui Group</h3>
              <Image
                src="/img/honhui-logo.png"
                alt="Honhui Logo"
                width={3000}
                height={3000}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <Card className="m-4 dark:bg-primary-800">
        <CardHeader>Team</CardHeader>
        <CardBody className="flex flex-col items-center gap-4">
          <h1 className="mb-2 text-center text-3xl font-semibold">
            Project Leader
          </h1>
          <div className="flex flex-col items-center">
            <Image
              className="border"
              src="/img/leader.png"
              alt="leader-img"
              width={175}
              height={175}
            />
            <h2 className="my-2 text-center text-xl font-semibold">
              Prof. Yue-Shan Chang
            </h2>
            <p className="text-center text-lg">Distinguished Professor</p>
            <p className="text-center text-lg">
              Department of Computer Science and Information Engineering
            </p>
          </div>
          <h1 className="mb-2 text-center text-3xl font-semibold">
            Project Assistant
          </h1>
          <div className="flex flex-col items-center lg:flex-row">
            <div className="flex flex-col items-center">
              <Image
                src="/img/member5.png"
                alt="member5-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                Cheng-han Zhan
              </h2>
              <p className="text-center text-lg">
                Department of Computer Science and Information Engineering,
                Master's Program
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member1.png"
                alt="member1-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                Geoffrey Farrel
              </h2>
              <p className="text-center text-lg">
                Department of Computer Science and Information Engineering
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member2.png"
                alt="member2-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                Dechawat Phithiwatwong
              </h2>
              <p className="text-center text-lg">
                Department of Computer Science and Information Engineering
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member3.png"
                alt="member3-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                Ellen Asyana Gani
              </h2>
              <p className="text-center text-lg">
                Department of Computer Science and Information Engineering
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member4.png"
                alt="member4-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                Vincent Nyoman
              </h2>
              <p className="text-center text-lg">
                Department of Computer Science and Information Engineering
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default About;
