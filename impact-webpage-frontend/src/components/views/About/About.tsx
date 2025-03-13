import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const About = ({ messages }: { messages: Record<string, string> }) => {
  const t = useTranslations();
  return (
    <section>
      <Card className="m-4 dark:bg-primary-800">
        <CardHeader className="mx-4">{t("project_overview")}</CardHeader>
        <Divider />
        <CardBody className="mb-4 flex flex-col justify-center lg:flex-row">
          <div className="flex w-full flex-col items-center">
            <h2 className="m-4 text-center text-2xl font-bold">
              {t("project_title")}
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
              {t("project_overview_content")}
            </h2>
          </div>
        </CardBody>
      </Card>
      <div className="flex flex-col items-center lg:flex-row">
        <Card className="m-4 w-full dark:bg-primary-800">
          <CardHeader className="mx-4">{t("lead_institution")}</CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold">{t("ntpu")}</h3>
              <Image
                className="bg-white/80"
                src="/img/ntpu-logo.png"
                alt="NTPU Logo"
                width={3000}
                height={3000}
              />
            </div>
          </CardBody>
        </Card>
        <Card className="m-4 w-full dark:bg-primary-800">
          <CardHeader className="mx-4">{t("project_sponsor")}</CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold">{t("honhui")}</h3>
              <Image
                className="bg-white/80"
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
        <CardHeader>{t("team")}</CardHeader>
        <CardBody className="flex flex-col items-center gap-4">
          <h1 className="mb-2 text-center text-3xl font-semibold">
            {t("project_leader")}
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
              {t("yue_shan_chang")}
            </h2>
            <p className="text-center text-lg">{t("distinguished_prof")}</p>
            <p className="text-center text-lg">{t("csie")}</p>
          </div>
          <h1 className="mb-2 text-center text-3xl font-semibold">
            {t("project_assistant")}
          </h1>
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <div className="flex flex-col items-center">
              <Image
                src="/img/member5.png"
                alt="member5-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                {t("cheng_han_zhan")}
              </h2>
              <p className="text-center text-lg">{t("csie2")}</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member1.png"
                alt="member1-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                {t("geoffrey_farrel")}
              </h2>
              <p className="text-center text-lg">{t("csie")}</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member2.png"
                alt="member2-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                {t("wen_jun_huang")}
              </h2>
              <p className="text-center text-lg">{t("csie")}</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member3.png"
                alt="member3-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                {t("ellen_asyana_gani")}
              </h2>
              <p className="text-center text-lg">{t("csie")}</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/img/member4.png"
                alt="member4-img"
                width={150}
                height={150}
              />
              <h2 className="my-2 text-center text-xl font-semibold">
                {t("vincent_nyoman")}
              </h2>
              <p className="text-center text-lg">{t("csie")}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default About;
