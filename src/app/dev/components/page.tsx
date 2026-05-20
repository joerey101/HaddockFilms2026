"use client";
import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { Label } from '@/components/primitives/Label';
import { Link } from '@/components/primitives/Link';
import { Button } from '@/components/primitives/Button';
import { Tag } from '@/components/primitives/Tag';

export default function DevComponentsPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <Container>
        <Heading as="h1" size="display-lg" className="mb-10">Componentes Primitivos</Heading>

        <Section spacing="sm" className="border-b border-primary/10">
          <Heading as="h2" size="h2" className="mb-4">Heading</Heading>
          <div className="space-y-4">
            <Heading as="h1" size="display-xl">Display XL</Heading>
            <Heading as="h1" size="display-lg">Display LG</Heading>
            <Heading as="h1" size="h1">Heading 1</Heading>
            <Heading as="h2" size="h2">Heading 2</Heading>
            <Heading as="h3" size="h3">Heading 3</Heading>
            <Heading as="h4" size="h3" font="sans">Heading 3 Sans</Heading>
          </div>
        </Section>

        <Section spacing="sm" className="border-b border-primary/10">
          <Heading as="h2" size="h2" className="mb-4">Text</Heading>
          <div className="space-y-4">
            <Text size="body-lg">Body Large: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <Text size="body">Body Normal: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <Text size="body-sm">Body Small: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <Text size="body" tone="secondary">Tone Secondary: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            <Text size="body" tone="muted">Tone Muted: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </div>
        </Section>

        <Section spacing="sm" className="border-b border-primary/10">
          <Heading as="h2" size="h2" className="mb-4">Label & Tag</Heading>
          <div className="space-y-4">
            <div>
              <Label>Label Uppercase: 2009 · Película</Label>
            </div>
            <div className="space-x-2">
              <Tag>Drama</Tag>
              <Tag tone="accent">Destacada</Tag>
            </div>
          </div>
        </Section>

        <Section spacing="sm" className="border-b border-primary/10">
          <Heading as="h2" size="h2" className="mb-4">Link & Button</Heading>
          <div className="space-y-4">
            <div className="space-x-4">
              <Link href="#">Link Default</Link>
              <Link href="#" variant="underlined">Link Underlined</Link>
              <Link href="#" variant="accent">Link Accent</Link>
            </div>
            <div className="space-x-4">
              <Button variant="primary">Button Primary</Button>
              <Button variant="ghost">Button Ghost</Button>
              <Button variant="link">Button Link</Button>
            </div>
            <div className="space-x-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </Section>

        <Section spacing="sm">
          <Heading as="h2" size="h2" className="mb-4">Container & Section</Heading>
          <Text>Esta página usa `Container` y `Section spacing=&quot;sm&quot;` para su estructura.</Text>
        </Section>
      </Container>
    </div>
  );
}
