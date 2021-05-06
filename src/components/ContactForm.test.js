import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText(/contact form/i)

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "Jack")

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole('button')
    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "Jackie")

    const lastName = screen.getByLabelText(/Last Name/i)
    userEvent.type(lastName, "Harlow")

    const button = screen.getByRole('button')
    userEvent.click(button)


    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'fakeMail')

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)
    
    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "Jackie")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'realMail@yahoo.com')

    const button = screen.getByRole('button')
    userEvent.click(button)

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1)
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "Jackie")

    const lastName = screen.getByLabelText(/Last Name/i)
    userEvent.type(lastName, "Harlow")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'realMail@yahoo.com')

    const button = screen.getByRole('button')
    userEvent.click(button)

    
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(button).toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/First Name/i)
    userEvent.type(firstName, "Jackie")

    const lastName = screen.getByLabelText(/Last Name/i)
    userEvent.type(lastName, "Harlow")

    const email = screen.getByLabelText(/email/i)
    userEvent.type(email, 'realMail@yahoo.com')

    const message = screen.getByLabelText(/message/i)
    userEvent.type(message, 'randomtext')


    const button = screen.getByRole('button')
    userEvent.click(button)
    
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(message).toBeInTheDocument()
});