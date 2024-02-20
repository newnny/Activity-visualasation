import React from "react";
import { Menu } from '@headlessui/react'

interface DropdownProps {
  list: string[]
}
const Dropdown: React.FC<DropdownProps> = ({ list }) => {
  return (
    <Menu>
      <Menu.Button>List of items</Menu.Button>
      <Menu.Items>
        {
          list.map((item, i) =>
            <Menu.Item key={i}>
              {({ active }) => (
                <span
                  className={`${active && 'bg-blue-500'}`}
                >
                  {item}
                </span>
              )}
            </Menu.Item>
          )
        }
      </Menu.Items>
    </Menu>
  )
}

export default Dropdown