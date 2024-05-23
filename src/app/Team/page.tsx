/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import Image from "next/image";
import members from "@/Members.json"
export const metadata: Metadata = {
    title: "Fairport Robotics - Team 578",
    description: "About Our Team.",
};

const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
]


export default function Home() {

    //console.log(JSON.stringify(members,null,2))


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
                       Hello, we are Team 578! Below are some members of our team.
                    </p>
                </div>

                <div className="flex flex-row flex-wrap gap-4 bg-slate-800 p-4 justify-between" >
                {/* this is where the magic happens */}
                {members.map((member,index) => (
                    <div key={index} className="text-center w-48 bg-slate-700">
                    <Image
                    src={member.imagePath} width={200} height={100} alt={member.name}/>
                    <p className="font-semibold text-center"> {member.name} </p>
                    <q className="text-wrap"><i dangerouslySetInnerHTML={({ __html: member.Quote })} /></q>
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
