import Projects from "@/Projects.json";
import { Metadata } from "next";
import Image from "next/image";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { MapIcon } from "lucide-react";
const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
]

export default function Home() {
console.log(Projects)
    return (
        <>
            <header className="bg-gray shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p>
                       Hello, we are Team 578! Below are some upcoming events and projects.
                    </p>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8" >
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome</h1>
                {Projects.map((Projects,index) => (
                    <div key={index} className="content-start w-[200px]">
                    <p className="name"> {Projects.name} </p>
                    <Image
                    src={Projects.imagePath} width={200} height={100} alt={Projects.name} className="photo"/>
                     <q className="text-wrap"><i dangerouslySetInnerHTML={({ __html: Projects.Quote })} /></q>
                    </div>
                ))}
               
                </div>

                <div className="bg-red py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        {stats.map((stat) => (
                                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                    <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </main>
        </>
    );
}