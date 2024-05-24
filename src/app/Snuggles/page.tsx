import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
    title: "Fairport Robotics - Team 578",
    description: "The homepage for Fairport Robotics Team 578",
};

const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
]

export default function Home() {
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Wattermellon Cat</h1>
                </div>
            </header>
            <main>
               
                <p className="beans">     This is wattermelon cat. After about one week of being in agonizing pain as a broken image, he has finaly been released to wreak havoc on the world. Say your prayers. </p>
                


                <div className="bg-white py-24 sm:py-32">
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
